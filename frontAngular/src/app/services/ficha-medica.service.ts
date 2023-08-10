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

  uploadAudio(file: BodyAudio): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseBody>(`${this.url}/upload`, file, { headers });
  }

}
