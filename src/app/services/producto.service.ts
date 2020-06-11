import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetProductos() { //  Observable<any>
    return this.http.get<Producto[]>(`${this.API_URI}/producto`);
  }
  onGetProducto(id: string) {
    return this.http.get<Producto>(`${this.API_URI}/producto/${id}`);
  }
  onDeleteProductos(id: string, producto: Producto): Observable<any> {
    const newProducto: Producto = {
      estado: producto.estado
    };
    const fd = new FormData();
    fd.append('estado', producto.estado);
    console.log(fd);
    return this.http.put(`${this.API_URI}/producto/put/${id}`, newProducto);
  }
  onSaveProductos(producto: Producto) {
    const fd = new FormData();
    fd.append('idcategoria', producto.idcategoria);
    fd.append('nombre', producto.nombre);
    fd.append('describir', producto.describir);
    fd.append('image', producto.image);
    fd.append('precio', producto.precio);
    fd.append('stock', producto.stock);
    fd.append('estado', producto.estado);
    return this.http.post(`${this.API_URI}/producto`, fd);
  }
  onUpdateProductos(id: string, producto: Producto): Observable<any> {
    const fd = new FormData();
    fd.append('idcategoria', producto.idcategoria);
    fd.append('nombre', producto.nombre);
    fd.append('describir', producto.describir);
    fd.append('image', producto.image);
    fd.append('precio', producto.precio);
    fd.append('stock', producto.stock);
    fd.append('estado', producto.estado);
    return this.http.put(`${this.API_URI}/producto/${id}`, fd);
  }
  onUpdateStock(id: string, producto: Producto): Observable<any> {
    const newProductoStock: Producto = {
      stock: producto.stock
    };
    return this.http.put(`${this.API_URI}/producto/stock/${id}`, newProductoStock);
  }
}
