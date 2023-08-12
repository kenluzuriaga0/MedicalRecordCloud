# Medical Record Serverless ☁️
Proyecto final para la materia **Computación en la nube** - 9no Semestre

> ### Aplicacion para convertir audio a texto usando servicios de AWS

![arquitectura de servicios](/frontAngular/src/assets/architecture.jpg)

## Servicios Aws
* Api Gateway
* Amazon Lambda
* Amazon S3
* Amazon Transcribe

## Implementación
En primer lugar tenemos la aplicación frontend, hecha en angular. Este permite la grabación de un audio y las acciones de poder “descargar”, “eliminar” y “enviar” dicho audio.
La app consume endpoints expuestos gracias a **Api Gateway** conectada a una de las funciones **lambdas**, los cuales permiten guardar un archivo .wav  en un **bucket de S3** que representa la nota de voz grabada en el momento. 
Una vez guardado el archivo .wav, se ejecuta un trigger de tipo PUT object, que ejecuta una funciona lambda que guarda y ejecuta un **Transcription Job**, el cual es el responsable de la transcripcion del audio a texto.
Finalmente se tiene un metodo GET en la api gateway el cual llama a la última función lambda que obtiene el transcription Job por medio de un parámetro llamado “jobname”. Este job tiene 3 estado **(IN PROGRESS, FAILED, COMPLETED)**, si está en estado completado, quiere decir que el texto ya está transcrito, y la app de angular se encargará de presentar el texto transcrito dentro del input que se elijió para que pueda ser revisado y corregido por el usuario  si fuese necesario.

## Anexo
![Alt text](/frontAngular/src/assets/anexo.png)