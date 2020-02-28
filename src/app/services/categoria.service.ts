import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  onGetCategorias() { //  Observable<any>
   return this.http.get(`${this.API_URI}/categoria`);
  }
  onGetCategoria(id: string) {
   return this.http.get(`${this.API_URI}/categoria/${id}`);
  }
  onDeleteCategoria(id: string): Observable<any> {
   return this.http.delete(`${this.API_URI}/categoria/${id}`);
  }
  onSaveCategoria(categoria: Categoria) {
    const fd = new FormData();
    fd.append('nombre', categoria.nombre);
    fd.append('image', categoria.image);
    fd.append('estado', categoria.estado);
    return this.http.post(`${this.API_URI}/categoria`, fd);
  }
  onUpdateCategoria(id: string, categoria: Categoria): Observable<any> {
    const fd = new FormData();
    fd.append('nombre', categoria.nombre);
    fd.append('image', categoria.image);
    fd.append('estado', categoria.estado);
    return this.http.put(`${this.API_URI}/categoria/${id}`, fd);
  }
}
