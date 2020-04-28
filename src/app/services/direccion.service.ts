import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direccion } from '../models/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetDireccions() { //  Observable<any>
    return this.http.get<Direccion[]>(`${this.API_URI}/direccion`);
  }
  onGetDireccion(id: string) {
    return this.http.get<Direccion[]>(`${this.API_URI}/direccion/${id}`);
  }
  onDeleteDireccion(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/direccion/${id}`);
  }
  onSaveDireccion(direccion: Direccion) {
    const newDireccion: Direccion = {
      domisoci: direccion.domisoci,
      provincia: direccion.provincia,
      canton: direccion.canton,
      parroquia: direccion.parroquia,
      sector: direccion.sector,
      calleprincipal: direccion.calleprincipal,
      numeracion: direccion.numeracion,
      callesecundaria: direccion.callesecundaria,
      descripcion: direccion.descripcion,
      estado: direccion.estado,
    };
    return this.http.post(`${this.API_URI}/direccion`, newDireccion);
  }
  onUpdateDireccion(id: string, direccion: Direccion): Observable<any> {
    const newDireccion: Direccion = {
      domisoci: direccion.domisoci,
      provincia: direccion.provincia,
      canton: direccion.canton,
      parroquia: direccion.parroquia,
      sector: direccion.sector,
      calleprincipal: direccion.calleprincipal,
      numeracion: direccion.numeracion,
      callesecundaria: direccion.callesecundaria,
      descripcion: direccion.descripcion,
      estado: direccion.estado,
    };
    return this.http.put(`${this.API_URI}/direccion/${id}`, newDireccion);
  }
}
