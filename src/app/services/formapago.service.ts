import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transbanc } from '../models/transbanc';
import { Formapago } from '../models/formapago';

@Injectable({
  providedIn: 'root'
})
export class FormapagoService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
   onSaveTransBanc(formapago: Formapago) {
     const newFormapago: Formapago = {
      idfactura: formapago.idfactura,
      nombre: formapago.nombre,
      estado: formapago.estado
     };
     console.log(newFormapago);
     return this.http.post(`${this.API_URI}/formaPago/tranban`, newFormapago);
   }
}
