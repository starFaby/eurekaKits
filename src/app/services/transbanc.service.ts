import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transbanc } from '../models/transbanc';

@Injectable({
  providedIn: 'root'
})
export class TransbancService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onSaveTransBanc(transbanc: Transbanc) {
    const newTransbanc: Transbanc = {
      idformapago: transbanc.idformapago,
      numfactura: transbanc.numfactura,
      preciofactura: transbanc.preciofactura,
      image: transbanc.image,
      estado: transbanc.estado,
    };
    return this.http.post(`${this.API_URI}/transbanc`, newTransbanc);
  }
}
