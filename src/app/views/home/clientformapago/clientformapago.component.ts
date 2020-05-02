import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Transbancformvali } from 'src/app/validators/transbancformvali';
import { Transbanc } from 'src/app/models/transbanc';
import { Formapagoformvali } from 'src/app/validators/formapagoformvali';
import { Formapago } from 'src/app/models/formapago';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/models/factura';
import { FormapagoService } from 'src/app/services/formapago.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Personafactura } from 'src/app/models/personafactura';
import { Tipopago } from 'src/app/models/tipopago';
import { Paypaltransbefec } from 'src/app/models/paypaltransbefec';
import { Pagofactindiv } from 'src/app/models/pagofactindiv';
import { Paypal } from 'src/app/models/paypal';
import { Efectivo } from 'src/app/models/efectivo';

@Component({
  selector: 'app-clientformapago',
  templateUrl: './clientformapago.component.html',
  styleUrls: ['./clientformapago.component.scss']
})
export class ClientformapagoComponent implements OnInit {
  file: File;
  formFormPago: FormGroup;
  formTransBanc: FormGroup;
  photoSelected: string | ArrayBuffer;
  personaFactura: Personafactura[];      // para ver la persona con su factura
  tipoPago: Tipopago[];                  // muestra los nombres de paypal trans banc y efectivo
  Paypaltransbefec1: Paypaltransbefec[]; // mostar solo facturas paypal
  Paypaltransbefec2: Paypaltransbefec[]; // mostar solo facturas tranferencia bancaria
  Paypaltransbefec3: Paypaltransbefec[]; // mostar solo facturas efectivo
  pagofactindiv: Pagofactindiv[];        // nos sirve para obtener el numero de  factura y mostrar
  activeTab;                             // para mostrar las fromas de pago de forma autoamtica
  paypal: Paypal = {                     // interfacce paypal
    idformapago: '',
    numfactura: '',
    preciofactura: '',
    estado: 1,
  };
  transbanc: Transbanc = {
    idformapago: '',
    numfactura: '',
    preciofactura: '',
    image: '',
    estado: 1,
  };
  efectivo: Efectivo = {
    idformapago: '',
    numfactura: '',
    preciofactura: '',
    estado: 1,
  };
  constructor(
    private formapagoformvali: Formapagoformvali,
    private transbancformvali: Transbancformvali,
    private facturaService: FacturaService,
    private formapagoService: FormapagoService,
    private consultasService: ConsultasService
  ) {
    this.formFormPago = this.formapagoformvali.formFormPago;
    this.formTransBanc = this.transbancformvali.formTransBanc;
  }

  ngOnInit() {
    this.onGetPersonaFactura();
    this.onGetTipoPago();
    this.onGetPagoFactPaypal();
    this.onGetPagoFactTransBanc();
    this.onGetPagoFactEfectivo();
  }
  onValueChange(event) {
    this.activeTab = event.value - 1; // evento que ayuda para  visuliazar si es paypal trans banca y efectivo
  }
  onGetPersonaFactura() { // cada persona con su factura
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetpersonafactura(idpersona).subscribe(
      res => {
        this.personaFactura = res.map(t => t);
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetTipoPago() { // paypal transferencia bancaria efectivo los tres metodos
    this.consultasService.onGettipopago().subscribe(
      res => {
        this.tipoPago = res.map(t => t);
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetPagoFactPaypal() { // recibe solo facturas para paypal por usuario
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetPagoFactPaypal(idpersona).subscribe(
      res => {
        console.log(res);
        this.Paypaltransbefec1 = res.map(t => t); // muestra facturas paypal
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetPagoFactTransBanc() {
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetPagoFactTransBanc(idpersona).subscribe(
      res => {
        console.log(res);
        this.Paypaltransbefec2 = res.map(t => t); // muestra solo facturas transferencia bancaria
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetPagoFactEfectivo() {
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetPagoFactEfectivo(idpersona).subscribe(
      res => {
        console.log(res);
        this.Paypaltransbefec3 = res.map(t => t); // muestra facturas solo efectivo
      },
      err => {
        console.log(err);
      }
    );
  }
  onNumFactPaypal(event) { // para ver los datos de la siguiente factura comprada en paypal
    console.log(event.value);
    const numfactura = event.value;
    this.consultasService.onGetPagoFactIndiv(numfactura).subscribe(
      res => {
        this.pagofactindiv = res.map(t => t);
        this.paypal.idformapago = this.pagofactindiv[0].idformapago;
        this.paypal.numfactura = this.pagofactindiv[0].numfactura;
        this.paypal.preciofactura = this.pagofactindiv[0].total;
      },
      err => {
        console.log(err);
      }
    );
  }
  onNumFactTrasBanc(event) { // para ver los datos de la siguiente factura comprada en transferencia bancaria
    console.log(event.value);
    const numfactura = event.value;
    this.consultasService.onGetPagoFactIndiv(numfactura).subscribe(
      res => {
        this.pagofactindiv = res.map(t => t);
        this.transbanc.idformapago = this.pagofactindiv[0].idformapago;
        this.transbanc.numfactura = this.pagofactindiv[0].numfactura;
        this.transbanc.preciofactura = this.pagofactindiv[0].total;
        this.transbanc.image = this.file;
      },
      err => {
        console.log(err);
      }
    );
  }
  onNumFactEfectivo(event) { // para ver los datos de la siguiente factura comprada en transferencia bancaria
    console.log(event.value);
    const numfactura = event.value;
    this.consultasService.onGetPagoFactIndiv(numfactura).subscribe(
      res => {
        this.pagofactindiv = res.map(t => t);
        this.efectivo.idformapago = this.pagofactindiv[0].idformapago;
        this.efectivo.numfactura = this.pagofactindiv[0].numfactura;
        this.efectivo.preciofactura = this.pagofactindiv[0].total;
      },
      err => {
        console.log(err);
      }
    );
  }
  onSubmit1() {
    if (this.formFormPago.valid) {
      if (this.formFormPago.get('idformapago').value == null) {
        const newFormapago: Formapago = {
          idfactura: this.formFormPago.get('idfactura').value,
          idtipopago: this.formFormPago.get('idtipopago').value,
          estado: this.formFormPago.get('estado').value,
        };
        this.formapagoService.onSaveFormaPago(newFormapago).subscribe(
          res => {
            console.log(res);
            this.onGetPagoFactPaypal();
            this.onGetPagoFactTransBanc();
            this.onGetPagoFactEfectivo();
          },
          err => {
            console.log(err);
          }
        );
        this.onGetClearFormaPAgo();
      }
    }
  }
  onSubmit2() { // para guardar en paypal
    console.log(this.paypal);
  }
  onSubmit3() { // Para Guardar en transferencia Bancaria
    this.transbanc.image = this.file;
    console.log(this.transbanc);
  }
  onSubmit4() {
    console.log(this.efectivo);
  }
  onGetClearFormaPAgo() {
    this.formapagoformvali.oninitializeFomrGroup();
  }
  onPhotoSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
}
