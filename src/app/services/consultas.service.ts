import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultas } from '../models/consultas';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetPersonapdt(id: string) {
    return this.http.get<Consultas[]>(`${this.API_URI}/consultas/pdt/${id}`);
   }
}
