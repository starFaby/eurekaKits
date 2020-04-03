import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DetalleVenta } from '../models/detalleventa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetaventaService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;

  constructor(private http: HttpClient) {
   }
  onGetDetaVentas() { //  Observable<any>
    return this.http.get<DetalleVenta[]>(`${this.API_URI}/detaVenta`);
  }
  onGetDetaVenta(id: string) {
    return this.http.get<DetalleVenta>(`${this.API_URI}/detaVenta/${id}`);
  }
  onDeleteDetaVenta(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/detaVenta/${id}`);
  }
  onSaveDetaVenta(detalleVenta: DetalleVenta) {
    const fd = new FormData();
    fd.append('idfactura', detalleVenta.idfactura);
    fd.append('idproducto', detalleVenta.idproducto);
    fd.append('cantidad', detalleVenta.cantidad);
    fd.append('precio', detalleVenta.precio);
    fd.append('total', detalleVenta.total);
    fd.append('estado', detalleVenta.estado);
    return this.http.post(`${this.API_URI}/detaVenta`, fd);
  }
  onDetaVentaSuma(id: string) {
    return this.http.get<DetalleVenta>(`${this.API_URI}/detaVenta/${id}`);
  }
}
