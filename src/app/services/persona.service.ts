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
   onDeletePersona(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/persona/${id}`);
   }
   onSavePersona(persona: Persona) {
     const fd = new FormData();
     fd.append('idtelefono', persona.idtelefono);
     fd.append('iddireccion', persona.iddireccion);
     fd.append('cedula', persona.cedula);
     fd.append('nombres', persona.nombres);
     fd.append('apellidos', persona.apellidos);
     fd.append('fechanacimiento', persona.fechanacimiento);
     fd.append('email', persona.email);
     fd.append('password', persona.password);
     fd.append('estado', persona.estado);
     return this.http.post(`${this.API_URI}/persona`, fd);
   }
   onUpdatePersona(id: string, persona: Persona): Observable<any> {
     const fd = new FormData();
     fd.append('idtelefono', persona.idtelefono);
     fd.append('iddireccion', persona.iddireccion);
     fd.append('cedula', persona.cedula);
     fd.append('nombres', persona.nombres);
     fd.append('apellidos', persona.apellidos);
     fd.append('fechanacimiento', persona.fechanacimiento);
     fd.append('email', persona.email);
     fd.append('password', persona.password);
     fd.append('estado', persona.estado);
     return this.http.put(`${this.API_URI}/persona/${id}`, fd);
   }
}
