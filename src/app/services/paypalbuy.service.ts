import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaypalbuyService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { } 
  onSavePaypalBuy(newFactPaypal) {
    return this.http.post(`${this.API_URI}/paypalbuy`, newFactPaypal);
  }
}
