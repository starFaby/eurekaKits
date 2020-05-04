import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paypal } from '../models/paypal';
import { Efectivo } from '../models/efectivo';
@Injectable({
  providedIn: 'root'
})
export class EfectService { // Pago en efectivo
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onSaveEfectivo(efectivo: Efectivo) {
    const newEfectivo: Efectivo = {
      idformapago: efectivo.idformapago,
      numfactura: efectivo.numfactura,
      preciofactura: efectivo.preciofactura,
      estado: efectivo.estado,
    };
    return this.http.post(`${this.API_URI}/efect`, newEfectivo);
  }
}
