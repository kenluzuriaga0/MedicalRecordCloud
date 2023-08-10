import json
import boto3
import time
import urllib

def lambda_handler(event, context):
    """ 
    Crea un transcription job y le pasa el audio buscado. 
    """

    transcribe_client = boto3.client('transcribe')

    file_uri = 's3://medical-record-g7-bucket/audio_test.wav'
    text = transcribe_file('Example-job', file_uri, transcribe_client)
    response_text = text
    
    if text == "No se pudo transcribir el audio":
        response_text = text
        
    return {
        'statusCode': 200,
        'body': json.dumps(response_text)
    }



def transcribe_file(job_name, file_uri, transcribe_client):
    transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': file_uri},
        MediaFormat='wav',
        LanguageCode='es-ES'
    )

    # Verifica cada 10 segundos si la transcripcion terminó [COMPLETED, FAILED], por 10 minuto
    max_tries = 60
    while max_tries > 0:
        max_tries -= 1
        job = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
        job_status = job['TranscriptionJob']['TranscriptionJobStatus']
        if job_status in ['COMPLETED', 'FAILED']:
            print(f"Job {job_name} en {job_status}.")
            if job_status == 'COMPLETED':
                response = urllib.request.urlopen(job['TranscriptionJob']['Transcript']['TranscriptFileUri'])
                data = json.loads(response.read())
                text = data['results']['transcripts'][0]['transcript']
                print("============= speech-to-text =====================")
                print(text)
                print("====================================================")
                return text
            print("=== El job falló ===")
            break
        else:
            print(f"Esperando por {job_name}. Estado actual: {job_status}.")
        time.sleep(10)
    return "No se pudo transcribir el audio" 