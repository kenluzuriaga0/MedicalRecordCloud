import json
import boto3
import time
import urllib


def lambda_handler(event, context):
    """ 
    Busca el transcription job y lo retorna. 
    """
    transcribe_client = boto3.client('transcribe')

    job_name = event['queryStringParameters']['jobname']

    transcribed_text =  get_transcribe(job_name, transcribe_client)
    
    # El GET tiene activo el lambda proxy integration y necesita este schema de json 
    return {
        "isBase64Encoded": False,
        "statusCode": '200',
        "headers": { "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*'},
        "body": json.dumps(transcribed_text)
        }
        
def get_transcribe(job_name, transcribe_client):
    """ Obtiene la transcripcion por el nombre y retorna una respuesta segun el estado del Job """
    try:
        job = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
    except:
         return {"message": "No se encontró el job %s" % job_name }
    job_status = job['TranscriptionJob']['TranscriptionJobStatus']
    if job_status in ['COMPLETED', 'FAILED']:
        if job_status == 'COMPLETED':

            response = urllib.request.urlopen(job['TranscriptionJob']['Transcript']['TranscriptFileUri'])
            data = json.loads(response.read())
            text = data['results']['transcripts'][0]['transcript']
            
            print_transcription(text)

            return {"message": "La transcripcion %s ha sido procesada [%s]" % (job_name, job_status), 
                    "body": json.dumps(text)}
        
        print("=== El job falló ===")
        return {"message": "La transcripcion %s falló [%s]" % (job_name, job_status)}
    else:
        return  {"message": "La transcripcion %s aun no acaba [%s]" % (job_name, job_status)}


def print_transcription(text):
    print("============= speech-to-text =====================")
    print(text)
    print("====================================================")
    