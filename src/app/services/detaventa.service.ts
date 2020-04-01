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

  constructor(private http: HttpClient) { }
  onGetDetaVentas() { //  Observable<any>
    return this.http.get<DetalleVenta>(`${this.API_URI}/detaVenta`);
   }
   onGetDetaVenta(id: string) {
    return this.http.get<DetalleVenta>(`${this.API_URI}/detaVenta/${id}`);
   }
   onDeleteDetaVenta(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/detaVenta/${id}`);
   }
   onSaveDetaVenta(detalleVenta: DetalleVenta) {
     const fd = new FormData();
   /*  fd.append('idCategoria', producto.idCategoria);
     fd.append('nombre', producto.nombre);
     fd.append('image', producto.image);
     fd.append('precio', producto.precio);
     fd.append('stock', producto.stock);
     fd.append('estado', producto.estado);*/
    // fd.append('created_at', producto.created_at);
     return this.http.post(`${this.API_URI}/detaVenta`, fd);
   }
   onUpdateDetaVenta(id: string, detalleVenta: DetalleVenta): Observable<any> {
     const fd = new FormData();
   /*  fd.append('idCategoria', producto.idCategoria);
     fd.append('nombre', producto.nombre);
     fd.append('image', producto.image);
     fd.append('precio', producto.precio);
     fd.append('stock', producto.stock);
     fd.append('estado', producto.estado);*/
    // fd.append('created_at', producto.created_at);
     return this.http.put(`${this.API_URI}/detaVenta/${id}`, fd);
   }
}
