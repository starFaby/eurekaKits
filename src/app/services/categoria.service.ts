import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetCategorias() { //  Observable<any>
    return this.http.get<Categoria[]>(`${this.API_URI}/categoria`);
  }
  onGetCategoria(id: string) {
    return this.http.get(`${this.API_URI}/categoria/${id}`);
  }
  onDeleteCategoria(id: string, categoria: Categoria): Observable<any> {
    const newCategoria: Categoria = {
      estado: categoria.estado
    };
    return this.http.put(`${this.API_URI}/categoria/put/${id}`, newCategoria);
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
