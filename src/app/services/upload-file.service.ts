import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
    private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  upload(file: File, name:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('name', name);

    const req = new HttpRequest('POST', `${this.apiServerUrl}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getImage(image: string): Observable<Blob> {
    return this.http.get(`http://localhost:8080/files/${image}`, {responseType: 'blob'});
  }
}