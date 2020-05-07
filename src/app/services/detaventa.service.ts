import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DetalleVentas } from '../models/detalleventa';
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
    return this.http.get<DetalleVentas[]>(`${this.API_URI}/detaVenta`);
  }
  onGetDetaVenta(id: string) {
    return this.http.get<DetalleVentas>(`${this.API_URI}/detaVenta/${id}`);
  }
  onDeleteDetaVenta(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/detaVenta/${id}`);
  }
  onSaveDetaVenta(detalleVenta: DetalleVentas) {
    const newDetalleVenta: DetalleVentas = {
      idproducto: detalleVenta.idproducto,
      idfactura: detalleVenta.idfactura,
      cantidad: detalleVenta.cantidad,
      precio: detalleVenta.precio,
      total: detalleVenta.total,
      estado: detalleVenta.estado
    };
    return this.http.post(`${this.API_URI}/detaVenta`, newDetalleVenta);
  }
  onDetaVentaSuma(id: string) {
    return this.http.get<DetalleVentas>(`${this.API_URI}/detaVenta/${id}`);
  }
}
