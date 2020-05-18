import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetPromociones() { //  Observable<any>
    return this.http.get<Promocion[]>(`${this.API_URI}/promocion`);
  }
  onGetPromocion(id: string) {
    return this.http.get<Promocion[]>(`${this.API_URI}/promocion/${id}`);
  }
  onDeletePromocion(id: string, promocion: Promocion): Observable<any> {
    const newPromocion: Promocion = {
      estado: promocion.estado
    };
    return this.http.put(`${this.API_URI}/promocion/put/${id}`, newPromocion);
  }
  onSavePromocion(promocion: Promocion) {
    const newPromocion: Promocion = {
      idproducto: promocion.idproducto,
      dto: promocion.dto,
      fechainicio: new Date(promocion.fechainicio),
      fechafin: new Date(promocion.fechafin),
      descripcion: promocion.descripcion,
      estado: promocion.estado,
    };
    return this.http.post(`${this.API_URI}/promocion`, newPromocion);
  }
  onUpdatePromocion(id: string, promocion: Promocion): Observable<any> {
    const newPromocion: Promocion = {
      idproducto: promocion.idproducto,
      dto: promocion.dto,
      fechainicio: new Date(promocion.fechainicio),
      fechafin: new Date(promocion.fechafin),
      descripcion: promocion.descripcion,
      estado: promocion.estado,
    };
    return this.http.put(`${this.API_URI}/promocion/${id}`, newPromocion);
  }
}
