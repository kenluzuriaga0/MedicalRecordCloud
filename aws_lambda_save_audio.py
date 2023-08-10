import json
import base64
import boto3


def lambda_handler(event, context):
    """ 
    Guarda un audio en s3. El audio viene codificado en base64 y se parsea.
    """

    print("Ejecutando funcion...")
    s3 = boto3.client("s3")

    get_file_content = event["audio"]
    filename = event["filename"]
    
    # imprimir contenido del body (300 caracteres)
    if type(get_file_content) == str:
        print(get_file_content[:300])
    
    data = base64.b64decode(get_file_content)

    s3.put_object(Bucket="medical-record-g7-bucket", Key=filename, Body=data)

    return {

        'statusCode': 200,
        'body': json.dumps("Subido correctamente " + filename)

    }

"""
NOTAS:
    Dentro de api gateway, si no se configura ningun plantilla de mapeo
    el param 'event' es el body de formato json parseado a diccionario en python
"""
    