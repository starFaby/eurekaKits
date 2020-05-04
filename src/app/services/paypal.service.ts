import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paypal } from '../models/paypal';
@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onSavePaypal(paypal: Paypal) {
    const newPaypal: Paypal = {
      idformapago: paypal.idformapago,
      numfactura: paypal.numfactura,
      preciofactura: paypal.preciofactura,
      estado: paypal.estado,
    };
    return this.http.post(`${this.API_URI}/paypal`, newPaypal);
  }
}
