import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetPersonas() { //  Observable<any>
    return this.http.get<Persona[]>(`${this.API_URI}/persona`);
  }
  onGetPersona(id: string) {
    return this.http.get<Persona[]>(`${this.API_URI}/persona/${id}`);
  }
  onDeletePersona(id: string, persona: Persona): Observable<any> {
    const newPersona: Persona = {
      estado: persona.estado
    };
    return this.http.put(`${this.API_URI}/persona/put/${id}`, newPersona);
  }
  onSavePersona(persona: Persona) {
    const newPersona: Persona = {
      idtelefono: persona.idtelefono,
      iddireccion: persona.iddireccion,
      cedula: persona.cedula,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      fechanacimiento: persona.fechanacimiento,
      email: persona.email,
      password: persona.password,
      requerimiento: persona.requerimiento,
      estado: persona.estado
    };
    return this.http.post(`${this.API_URI}/persona`, newPersona);
  }
  onUpdatePersona(id: string, persona: Persona): Observable<any> {
    const newPersona: Persona = {
      idtelefono: persona.idtelefono,
      iddireccion: persona.iddireccion,
      cedula: persona.cedula,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      fechanacimiento: persona.fechanacimiento,
      email: persona.email,
      password: persona.password,
      requerimiento: persona.requerimiento,
      estado: persona.estado
    };
    return this.http.put(`${this.API_URI}/persona/${id}`, newPersona);
  }
}
