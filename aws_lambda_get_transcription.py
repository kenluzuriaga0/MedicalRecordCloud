import json
import boto3
import time
import urllib


def lambda_handler(event, context):
    """ 
    Busca el transcription job y lo retorna. 
    """

    transcribe_client = boto3.client('transcribe')

    file_uri = 's3://medical-record-g7-bucket/audio_test.wav'
    text = get_transcribe('Example-job', file_uri, transcribe_client)
    response_text = text
    
    if text == "Aun no está listo la transcripcion":
        response_text = text
        
    return {
        'statusCode': 200,
        'body': json.dumps(response_text)
    }


def get_transcribe(job_name, transcribe_client):
    job = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
    job_status = job['TranscriptionJob']['TranscriptionJobStatus']
    if job_status == 'COMPLETED':
        response = urllib.request.urlopen(job['TranscriptionJob']['Transcript']['TranscriptFileUri'])
        data = json.loads(response.read())
        text = data['results']['transcripts'][0]['transcript']
        return text
    return "Aun no está listo la transcripcion" 