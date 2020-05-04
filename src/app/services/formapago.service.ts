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
   onSaveFormaPago(formapago: Formapago) {
     const newFormapago: Formapago = {
      idfactura: formapago.idfactura,
      idtipopago: formapago.idtipopago,
      estado: formapago.estado
     };
     return this.http.post(`${this.API_URI}/formapago`, newFormapago);
   }
   onUpdateFormaPagoEstado(id: string, formapago: Formapago): Observable<any> {
    const newFormapago: Formapago = {
      estado: formapago.estado
    };
    return this.http.put(`${this.API_URI}/formapago/${id}`, newFormapago);
  }
}
