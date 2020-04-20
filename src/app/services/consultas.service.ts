import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultas } from '../models/consultas';
import { Promocionpp } from '../models/promocionpp';
import { DetalleVenta } from '../models/detalleventa';
import { Numfactura } from '../models/numfactura';
import { Promocionppi } from '../models/promocionppi';

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
   onGetPromocionpp() {
    return this.http.get<Promocionpp[]>(`${this.API_URI}/consultas/promopp`);
   }
   onGetPromocionppi() {
    return this.http.get<Promocionppi[]>(`${this.API_URI}/consultas/promoppi`);
   }
   onGetDetaVentadvp() {
    return this.http.get<DetalleVenta[]>(`${this.API_URI}/consultas/devedvp`);
   }
   onGetNumFact() {
    return this.http.get<Numfactura[]>(`${this.API_URI}/consultas/numfact`);
   }
}