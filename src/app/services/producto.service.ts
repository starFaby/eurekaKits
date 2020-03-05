import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  onGetProductos() { //  Observable<any>
    return this.http.get(`${this.API_URI}/producto`);
   }
   onGetProducto(id: string) {
    return this.http.get(`${this.API_URI}/producto/${id}`);
   }
   onDeleteProductos(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/producto/${id}`);
   }
   onSaveProductos(producto: Producto) {
     const fd = new FormData();
     fd.append('idCategoria', producto.idCategoria);
     fd.append('nombre', producto.nombre);
     fd.append('image', producto.image);
     fd.append('precio', producto.precio);
     fd.append('stock', producto.stock);
     fd.append('estado', producto.estado);
    // fd.append('created_at', producto.created_at);
     return this.http.post(`${this.API_URI}/producto`, fd);
   }
   onUpdateProductos(id: string, producto: Producto): Observable<any> {
     const fd = new FormData();
     fd.append('idCategoria', producto.idCategoria);
     fd.append('nombre', producto.nombre);
     fd.append('image', producto.image);
     fd.append('precio', producto.precio);
     fd.append('stock', producto.stock);
     fd.append('estado', producto.estado);
    // fd.append('created_at', producto.created_at);
     return this.http.put(`${this.API_URI}/producto/${id}`, fd);
   }
}
