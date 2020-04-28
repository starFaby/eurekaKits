import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transbanc } from '../models/transbanc';
@Injectable({
  providedIn: 'root'
})
export class FptransbancService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
   onSaveTransBanc(transbanc: Transbanc) {
   /*  const newTransbanc: Transbanc = {
      idfactura: transbanc.idfactura,
      image: transbanc.image,
      estado: transbanc.estado
     };
     console.log(newTransbanc);
     return this.http.post(`${this.API_URI}/formaPago/tranban`, newTransbanc);*/
   }
}
