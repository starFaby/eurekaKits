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
import { PaypalService } from 'src/app/services/paypal.service';
import { TransbancService } from 'src/app/services/transbanc.service';
import { EfectService } from 'src/app/services/efect.service';
import { PaypalbuyService } from 'src/app/services/paypalbuy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientformapago',
  templateUrl: './clientformapago.component.html',
  styleUrls: ['./clientformapago.component.scss']
})
export class ClientformapagoComponent implements OnInit {
  link;
  file: File;
  confirmPaypal;
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
  newfacturaEstado: Factura = {
    estado: 0
  };
  newFormapago: Formapago = {
    estado: 0
  };
  constructor(
    private formapagoformvali: Formapagoformvali,
    private transbancformvali: Transbancformvali,
    private facturaService: FacturaService,
    private formapagoService: FormapagoService,
    private consultasService: ConsultasService,
    private paypalService: PaypalService,
    private transbancService: TransbancService,
    private efectService: EfectService,
    private paypalbuyService: PaypalbuyService,
    private router: Router
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
  onValueChange(event) {// evento que ayuda para  visuliazar si es paypal trans banca y efectivo
    this.activeTab = event.value - 1;
  }
  onGetPersonaFactura() { // cada persona con su factura
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetpersonafactura(idpersona).subscribe(
      res => {
        if (res != null) {
          this.personaFactura = res.map(t => t); // muestra facturas por persona que haya comprado
        } else {
          console.log('No Tiene Facturas ):');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetTipoPago() { // paypal transferencia bancaria efectivo los tres metodos
    this.consultasService.onGettipopago().subscribe(
      res => {
        if (res != null) {
          this.tipoPago = res.map(t => t); // muestra tipo de pago
        } else {
          console.log('No Tiene Tipo de pago');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetPagoFactPaypal() { // recibe solo facturas para paypal por persona
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetPagoFactPaypal(idpersona).subscribe(
      res => {
        if (res != null) {
          this.Paypaltransbefec1 = res.map(t => t); // muestra facturas paypal
        } else {
          console.log('No Tiene Facturas Paypal');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetPagoFactTransBanc() {// muestra solo facturas transferencia bancaria por persona
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetPagoFactTransBanc(idpersona).subscribe(
      res => {
        if (res != null) {
          this.Paypaltransbefec2 = res.map(t => t);
        } else {
          console.log('No Tiene Facturas de Transferencia Bancaria');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetPagoFactEfectivo() { // muestra facturas solo efectivo por persona
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetPagoFactEfectivo(idpersona).subscribe(
      res => {
        if (res != null) {
          this.Paypaltransbefec3 = res.map(t => t);
        } else {
          console.log('No Tiene Facturas Efectivo');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  onNumFactPaypal(event) { // para ver los datos de la siguiente factura comprada en paypal y guardar
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
  onNumFactTrasBanc(event) { // para ver los datos de la siguiente factura comprada en transferencia bancaria y guardar
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
  onNumFactEfectivo(event) { // para ver los datos de la siguiente factura comprada en transferencia bancaria y guardar
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
  onSubmitFacturaEstado(idFactura: any) {// para actualizar el estado de la factura
    this.facturaService.onUpdateFacturaEstado(idFactura, this.newfacturaEstado).subscribe(
      res => {
        console.log(res);
        this.onGetPersonaFactura();
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
        const idFactura = newFormapago.idfactura; // idFactura para poder cambiar el estado y ser
        // mostrado como cero cuando ya se haya comprado
        this.formapagoService.onSaveFormaPago(newFormapago).subscribe(
          res => {
            console.log(res);
            this.onSubmitFacturaEstado(idFactura);
            this.onGetPersonaFactura();
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
  onGetSuccess() {
    this.consultasService.onGetSuccess().subscribe(
      res => {
        console.log(res);
        console.log('Compardo exitosamente faby star');
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetCancel() {
    this.consultasService.onGetCancel().subscribe(
      res => {
        console.log(res);
        console.log('Cancelado exitosamente faby star');
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetConfirmPAypal() {
    if (this.paypal.idformapago !== '' && this.paypal.numfactura !== '' && this.paypal.preciofactura !== '') {
      let mensaje;
      const opcion = confirm('Al hacer click en Aceptar. Generas tu factura'
        + ' si no haz comparado aun, haz click en cancelar y vuelve mas tarde a cancelar');
      if (opcion === true) {
        mensaje = 'Has clickado OK';
        console.log(mensaje);
        this.onSubmit2();
      } else {
        mensaje = 'Has clickado Cancelar';
        console.log(mensaje);
      }
    } else {
      console.log('Seleccciona una Factura a Cancelar');
    }
  }
  onGetPagoFacturaPaypal() {
    if (this.paypal.idformapago !== '' && this.paypal.numfactura !== '' && this.paypal.preciofactura !== '') {
      this.paypalbuyService.onSavePaypalBuy(this.paypal).subscribe(
        date1 => {
          console.log('PAYPAL');
          console.log(date1);
          this.onGetPagoFactPaypal();
          // tslint:disable-next-line:no-string-literal
          const link = date1['newLInk'];
          window.open(link); // , 'paypal', 'width=200,height=100'
          this.confirmPaypal = true;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log('Seleccciona una Factura a Cancelar');
    }
  }
  onSubmit2() { // para guardar en paypal
    console.log(this.paypal);
    if (this.paypal.idformapago !== '' && this.paypal.numfactura !== '' && this.paypal.preciofactura !== '') {
      this.paypalService.onSavePaypal(this.paypal).subscribe(
        res => {
          console.log(res);
          this.formapagoService.onUpdateFormaPagoEstado(this.paypal.idformapago, this.newFormapago).subscribe(
            date => {
              console.log(date);
              this.router.navigate(['/clientFacturasptbe']);
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log('Estoy Vacio');
    }
  }
  onSubmit3() { // Para Guardar en transferencia Bancaria
    this.transbanc.image = this.file;
    console.log(this.transbanc);
    // tslint:disable-next-line:max-line-length
    if (this.transbanc.idformapago !== '' && this.transbanc.numfactura !== '' && this.transbanc.preciofactura !== '' && this.transbanc.image !== undefined) {
      this.transbancService.onSaveTransBanc(this.transbanc).subscribe(
        res => {
          console.log(res);
          this.formapagoService.onUpdateFormaPagoEstado(this.transbanc.idformapago, this.newFormapago).subscribe(
            date => {
              console.log(date);
              this.onGetPagoFactTransBanc();
              this.router.navigate(['/clientFacturasptbe']);
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log('Estamos Vacios');
    }
  }
  onSubmit4() { // Para guardar en efectivo
    console.log(this.efectivo);
    if (this.efectivo.idformapago !== '' && this.efectivo.numfactura !== '' && this.efectivo.preciofactura !== '') {
      this.efectService.onSaveEfectivo(this.efectivo).subscribe(
        res => {
          console.log(res);
          this.formapagoService.onUpdateFormaPagoEstado(this.efectivo.idformapago, this.newFormapago).subscribe(
            date => {
              console.log(date);
              this.onGetPagoFactEfectivo();
              this.router.navigate(['/clientFacturasptbe']);
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log('vacio :(');
    }
  }
  onGetClearFormaPAgo() {
    this.formapagoformvali.oninitializeFomrGroup();
  }
  onPhotoSelected(event): void { // para cargar la foto de loo que se ha echo la transaccion bancaria
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
}
