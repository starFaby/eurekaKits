import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Dto } from '../models/dto';
@Injectable({
  providedIn: 'root'
})
export class DtoService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onUpdateCategoria(id: string, dto: Dto): Observable<any> {
    const newDto: Dto = {
      dto: dto.dto,
      estado: dto.estado
    };
    return this.http.put(`${this.API_URI}/dto/${id}`, newDto);
  }
}
