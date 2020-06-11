import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';
import { Login } from '../models/login';
import jwt from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onLoginUp(persona: Persona) {
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
      estado: persona.estado,
    };
    console.log(newPersona);
    return this.http.post(`${this.API_URI}/login/up`, newPersona);
  }
  onLoginIn(login: Login) {
    const newLogin: Login = {
      email: login.email,
      password: login.password
    };
    return this.http.post(`${this.API_URI}/login/in`, newLogin);
  }
  onLoggedIn() {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idpersona');
    localStorage.removeItem('idfactura');
    // this.router.navigate(['/personForm']);
  }
  onGetToken() {
    return localStorage.getItem('token');
  }
  onGetTokenAdmin() {
    if (this.onGetToken() != null) {
      const tokenAuth = this.onGetToken();
      const tokenAdmin = this.onGetTokenInvert(tokenAuth);
      if (tokenAdmin === 1) {
        return !!tokenAuth;
      }
    }
  }
  onGetTokenInvert(token: string) {
    const aux = jwt(token);
    const newToken = aux.subject;
    return newToken;
  }
}
