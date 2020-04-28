import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Telefono } from '../models/telefono';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TelefonoService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetTelefonos() { //  Observable<any>
    return this.http.get<Telefono[]>(`${this.API_URI}/telefono`);
  }
  onGetTelefono(id: string) {
    return this.http.get<Telefono[]>(`${this.API_URI}/telefono/${id}`);
  }
  onDeleteTelefono(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/telefono/${id}`);
  }
  onSaveTelefono(telefono: Telefono) {
    const newTelefono: Telefono = {
      domisoci: telefono.domisoci,
      convencional: telefono.convencional,
      celular1: telefono.celular1,
      celular2: telefono.celular2,
      estado: telefono.estado
    };
    return this.http.post(`${this.API_URI}/telefono`, newTelefono);
  }
  onUpdateProductos(id: string, telefono: Telefono): Observable<any> {
    const newTelefono: Telefono = {
      domisoci: telefono.domisoci,
      convencional: telefono.convencional,
      celular1: telefono.celular1,
      celular2: telefono.celular2,
      estado: telefono.estado
    };
    return this.http.put(`${this.API_URI}/producto/${id}`, newTelefono);
  }

}
