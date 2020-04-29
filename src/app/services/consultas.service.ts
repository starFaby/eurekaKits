import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultas } from '../models/consultas';
import { Promocionpp } from '../models/promocionpp';
import { DetalleVentas } from '../models/detalleventa';
import { Numfactura } from '../models/numfactura';
import { Promocionppi } from '../models/promocionppi';
import { Productouni } from '../models/productouni';
import { Idfactura } from '../models/idfactura';
import { Promouni } from '../models/promouni';
import { Personafactura } from '../models/personafactura';
import { Tipopago } from '../models/tipopago';

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
   onGetPromocionuni(id: string) {
    return this.http.get<Promouni[]>(`${this.API_URI}/consultas/promouni/${id}`);
   }
   onGetDetaVentadvp(id: string) { // para visualizar la canasta por su id
    return this.http.get<DetalleVentas[]>(`${this.API_URI}/consultas/devedvp/${id}`);
   }
   onGetNumFact() {
    return this.http.get<Numfactura[]>(`${this.API_URI}/consultas/numfact`);
   }
   onGetIdFact() {
    return this.http.get<Idfactura[]>(`${this.API_URI}/consultas/idfact`);
   }
   onGetproductouni(id: string) {
    return this.http.get<Productouni[]>(`${this.API_URI}/consultas/productouni/${id}`);
   }
   onGetpersonafactura(id: string) {
    return this.http.get<Personafactura[]>(`${this.API_URI}/consultas/personafactura/${id}`);
   }
   onGettipopago() {
    return this.http.get<Tipopago[]>(`${this.API_URI}/consultas/tipopago`);
   }
}
