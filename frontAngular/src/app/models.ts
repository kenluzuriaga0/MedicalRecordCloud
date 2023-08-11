
export interface FichaMedica {
    aptitudCertificado?:string;
    comentario: string
    observacionAdicional: string
    resultadoPap: string
    resultadoEcoBilateral: string
    fechaEmision: Date
    infFirmaMedicoResponsable: string
    infMedicoResponsabe: string
    usuario: string
}


export interface ResponseBody {
    message?:string;
    body?: string
}


export interface BodyAudio{
    filename:string,
    audio:string,
    identificacion:string
}

export interface BodyTranscAudio{
    filename:string,
    audio:string,
}