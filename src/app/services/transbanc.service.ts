import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transbanc } from '../models/transbanc';

@Injectable({
  providedIn: 'root'
})
export class TransbancService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onSaveTransBanc(transbanc: Transbanc) {
    const fd = new FormData();
    fd.append('idformapago', transbanc.idformapago);
    fd.append('numfactura', transbanc.numfactura);
    fd.append('preciofactura', transbanc.preciofactura);
    fd.append('image', transbanc.image);
    fd.append('estado', transbanc.estado);
    return this.http.post(`${this.API_URI}/transbanc`, fd);
  }
}
