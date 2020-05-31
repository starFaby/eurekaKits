import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultas } from '../models/consultas';
import { Promocionpp } from '../models/promocionpp';
import { DetalleVentas } from '../models/detalleventa';
import { Numfactura } from '../models/numfactura';
import { Promocionppi } from '../models/promocionppi';
import { Productouni } from '../models/productouni';
import { Idfactura } from '../models/idfactura';
import { Promouni } from '../models/promouni';
import { Personafactura } from '../models/personafactura';
import { Tipopago } from '../models/tipopago';
import { Paypaltransbefec } from '../models/paypaltransbefec';
import { Pagofactindiv } from '../models/pagofactindiv';
import { Pagosptbe } from '../models/pagosptbe';
import { Facturadv } from '../models/facturadv';
import { Facturatotal } from '../models/facturatotal';
import { Persona } from '../models/persona';
import { Categoria } from '../models/categoria';
import { Reportproducto } from '../models/reportproducto';
import { Reportpersona } from '../models/reportpersona';
import { Reportpromociones } from '../models/reportpromociones';
import { Productoview } from '../models/productoview';
import { Dto } from '../models/dto';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  API_URI = environment.URL_SERVICE;
  API_URI_IMAGE = environment.URL_SERVICE_IMAGE;
  constructor(private http: HttpClient) { }
  onGetCategoria() {
    return this.http.get<Categoria[]>(`${this.API_URI}/consultas/categoria`);
   }
   onGetProducto() {
    return this.http.get<Productoview[]>(`${this.API_URI}/consultas/producto`);
   }
  onGetPersona() {
    return this.http.get<Persona[]>(`${this.API_URI}/consultas/pers`);
   }
   onGetEmail(email: Email) {
    const newEmail: Email = {
      email: email.email
    };
    return this.http.post<Email[]>(`${this.API_URI}/consultas/email`, newEmail);
   }
  onGetPersonapdt(id: string) {
    return this.http.get<Consultas[]>(`${this.API_URI}/consultas/pdt/${id}`);
   }
   onGetPromocionpp() {
    return this.http.get<Promocionpp[]>(`${this.API_URI}/consultas/promopp`);
   }
   onGetPromocionppi() {
    return this.http.get<Promocionppi[]>(`${this.API_URI}/consultas/promoppi`);
   }
   onGetPromocionuni(id: string) {
    return this.http.get<Promouni[]>(`${this.API_URI}/consultas/promouni/${id}`);
   }
   onGetDetaVentadvp(id: string) { // para visualizar la canasta por su id
    return this.http.get<DetalleVentas[]>(`${this.API_URI}/consultas/devedvp/${id}`);
   }
   onGetDto() { // para visualizar la canasta por su id
    return this.http.get<Dto[]>(`${this.API_URI}/consultas/dto`);
   }
   onGetNumFact() {
    return this.http.get<Numfactura[]>(`${this.API_URI}/consultas/numfact`);
   }
   onGetIdFact() {
    return this.http.get<Idfactura[]>(`${this.API_URI}/consultas/idfact`);
   }
   onGetproductouni(id: string) {
    return this.http.get<Productouni[]>(`${this.API_URI}/consultas/productouni/${id}`);
   }
   onGetpersonafactura(id: string) {
    return this.http.get<Personafactura[]>(`${this.API_URI}/consultas/personafactura/${id}`);
   }
   onGettipopago() {
    return this.http.get<Tipopago[]>(`${this.API_URI}/consultas/tipopago`);
   }
   onGetPagoFactPaypal(id: string) { // numero factura en paypal para ser cancelada
    return this.http.get<Paypaltransbefec[]>(`${this.API_URI}/consultas/pfpaypal/${id}`);
   }
   onGetPagoFactTransBanc(id: string) {// numero factura en Trasnferencia bancaria para ser cancelada
    return this.http.get<Paypaltransbefec[]>(`${this.API_URI}/consultas/pftransbanc/${id}`);
   }
   onGetPagoFactEfectivo(id: string) {// numero factura en efectivo para ser cancelada
    return this.http.get<Paypaltransbefec[]>(`${this.API_URI}/consultas/pfefectivo/${id}`);
   }
   onGetPagoFactIndiv(id: string) {// numero factura en efectivo para ser cancelada
    return this.http.get<Pagofactindiv[]>(`${this.API_URI}/consultas/pfindiv/${id}`);
   }
   onGetPagoPaypal(id: string) { // ver facturas pagadas echos en paypal
    return this.http.get<Pagosptbe[]>(`${this.API_URI}/consultas/pagopaypal/${id}`);
   }
   onGetPagoTransBanc(id: string) { // ver facturas pagadas echos en Transferencia Bancaria
    return this.http.get<Pagosptbe[]>(`${this.API_URI}/consultas/pagotransbanc/${id}`);
   }
   onGetPagoEfectivo(id: string) { // ver facturas pagadas echos en Efectivo
    return this.http.get<Pagosptbe[]>(`${this.API_URI}/consultas/pagoefectivo/${id}`);
   }
   onGetFacturadv(id: string) { // ver la factura de detalle ventas con sus produtos por el numde factura
    return this.http.get<Facturadv[]>(`${this.API_URI}/consultas/facturadv/${id}`);
   }
   onGetFacturaTotal(id: string) { // ver facturas pagadas por el numero de factura
    return this.http.get<Facturatotal[]>(`${this.API_URI}/consultas/facturatotal/${id}`);
   }
   onGetReportPersona() { // ver facturas pagadas por el numero de factura
    return this.http.get<Reportpersona[]>(`${this.API_URI}/consultas/reportpers`);
   }
   onGetReportCategoria() { // ver facturas pagadas por el numero de factura
    return this.http.get<Categoria[]>(`${this.API_URI}/consultas/reportcateg`);
   }
   onGetReportProducto() { // ver facturas pagadas por el numero de factura
    return this.http.get<Reportproducto[]>(`${this.API_URI}/consultas/reportprod`);
   }
   onGetReportPromociones() { // ver facturas pagadas por el numero de factura
    return this.http.get<Reportpromociones[]>(`${this.API_URI}/consultas/reportpromo`);
   }
   onGetSuccess() { // ver facturas pagadas por el numero de factura
    return this.http.get(`${this.API_URI}/paypalbuy/success`);
   }
   onGetCancel() { // ver facturas pagadas por el numero de factura
    return this.http.get(`${this.API_URI}/paypalbuy/cancel`);
   }
}
