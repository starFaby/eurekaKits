import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cateprod } from '../models/cateprod';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CateproduService {
  cateProduc: Cateprod;
  constructor(private http: HttpClient) { }
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  onGetProducto(id: string) {
    return this.http.get<Cateprod[]>(`${this.API_URI}/cateProdu/${id}`);
  }
}
