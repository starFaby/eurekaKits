import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { Factura } from '../models/factura';
@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
   onGetFacturaAll() {
    return this.http.get<Factura[]>(`${this.API_URI}/factura`);
   }
   onSaveFactura(factura: Factura) {
     const newFactura: Factura = {
      idpersona: factura.idpersona,
      numfactura: factura.numfactura,
      estado: factura.estado,
     };
     return this.http.post(`${this.API_URI}/factura`, newFactura);
   }
}
