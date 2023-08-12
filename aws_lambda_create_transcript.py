import json
import boto3
import time
import urllib

def lambda_handler(event, context):
    """ 
    Crea un transcription job y le pasa el audio buscado. 
    Soporta si la peticion viene de un trigger de S3 o si viene de un POST en el api gateway
    """
    print(event)
    transcribe_client = boto3.client('transcribe')

    bucket = 'medical-record-g7-bucket'
    
    if event.get('Records', False):
        file_name = get_filename_from_trigger_s3(event)
        job_name = file_name # El filename tiene mismo key que el job
    else:
        file_name = event['file_name']
        job_name = event['job_name']

    file_uri = 's3://%s/%s' % (bucket, file_name)

    job = transcribe_file(job_name, file_uri, transcribe_client)

    return {
        'message': 'Procesando la transcripcion del audio %s' % file_name,
        'body': json.dumps(job, default=str)
    }


def transcribe_file(job_name, file_uri, transcribe_client):
    transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': file_uri},
        MediaFormat='wav',
        LanguageCode='es-ES'
    )
    return transcribe_client.get_transcription_job(TranscriptionJobName=job_name)

def get_filename_from_trigger_s3(event):
    return event['Records'][0]['s3']['object']['key']