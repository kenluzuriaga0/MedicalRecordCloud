import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BodyAudio, ResponseBody } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  url = `${environment.baseUrl}`;
  constructor(private http: HttpClient) { }
  
  uploadAudio(file:BodyAudio): Observable<any> {
    const data: FormData = new FormData();
    // data.append('file', file);
    const newRequest = new HttpRequest('POST', `${this.url}/upload`, data, {
    reportProgress: true,
    responseType: 'text'
    });
    console.log(data.get('file'))
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Asegúrate de establecer el tipo MIME correcto para tu tipo de archivo binario,

    });
    return this.http.post<ResponseBody>(`${this.url}/upload`,file, {headers});
    }

    uploadAudio2(file:any): Observable<any> {
    
      const headers = new HttpHeaders({
        'Content-Type': 'audio/x-wav' // Asegúrate de establecer el tipo MIME correcto para tu tipo de archivo binario
      });
  
      // Realiza la solicitud POST y envía el binario en el cuerpo del mensaje
      return this.http.post<any>(`${this.url}/upload`, file, { headers });
    }

// 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
}
