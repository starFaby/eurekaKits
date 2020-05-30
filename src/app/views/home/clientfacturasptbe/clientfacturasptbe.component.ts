import { Component, OnInit } from '@angular/core';
import { Pagosptbe } from 'src/app/models/pagosptbe';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientfacturasptbe',
  templateUrl: './clientfacturasptbe.component.html',
  styleUrls: ['./clientfacturasptbe.component.scss']
})
export class ClientfacturasptbeComponent implements OnInit {
  idpersona;
  paypal;
  TransfBanc;
  efectivo;
  Pagosptbe1: Pagosptbe[]; // ver facturas pagadas echos en paypal
  Pagosptbe2: Pagosptbe[]; // ver facturas pagadas echos en Transferencia Bancaria
  Pagosptbe3: Pagosptbe[]; // ver facturas pagadas echos en Efectivo
  constructor(
    private consultasService: ConsultasService,
    private router: Router,
    private toast: ToastrService
    ) {
    this.idpersona = localStorage.getItem('idpersona');
  }

  ngOnInit() {
    this.onGetPagoPaypal();
    this.onGetPagoTransBanc();
    this.onGetPagoEfectivo();
  }
  onGetPagoPaypal() {
    this.consultasService.onGetPagoPaypal(this.idpersona).subscribe(
      res => {
        if (res != null) {
          this.Pagosptbe1 = res;
          if (this.Pagosptbe1[0].idtipopago === 1) {
            this.paypal = 'Paypal';
          }
        } else {
          this.toast.info('Info', 'No Tienes Facturas en Paypal', {
            timeOut: 3000
          });
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
              timeOut: 3000
            });
          }
        }
      }
    );
  }
  onGetPagoTransBanc() {
    this.consultasService.onGetPagoTransBanc(this.idpersona).subscribe(
      res => {
        if (res != null) {
          this.Pagosptbe2 = res;
          if (this.Pagosptbe2[0].idtipopago === 2) {
            this.TransfBanc = 'Trasnferencia Bancaria';
          }
        } else {
          this.toast.info('Info', 'No Tienes Facturas en Trasnferencia Bancaria', {
            timeOut: 3000
          });
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
              timeOut: 3000
            });
          }
        }
      }
    );
  }
  onGetPagoEfectivo() {
    this.consultasService.onGetPagoEfectivo(this.idpersona).subscribe(
      res => {
        if (res != null) {
          this.Pagosptbe3 = res;
          if (this.Pagosptbe3[0].idtipopago === 3) {
            this.efectivo = 'Efectivo';
          }
        } else {
          this.toast.info('Info', 'No Tienes Facturas en efectivo', {
            timeOut: 3000
          });
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
              timeOut: 3000
            });
          }
        }
      }
    );
  }
  onSelectedFactura(id: string) {
    this.router.navigate(['/clientFactura', btoa(id)]);
  }
}
