import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Promocionppi } from 'src/app/models/promocionppi';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss']
})
export class AdminlayoutComponent implements OnInit {
  opened: true;
  panelOpenState = false;
  promociones: Promocionppi[];
  cantPromo;
  constructor(
    private location: Location,
    public authService: AuthService,
    private consultasService: ConsultasService,
    private toast: ToastrService) {

  }
  ngOnInit() {
    this.onGetPromocionesppi();
  }
  onGetPromocionesppi() {
    this.consultasService.onGetPromocionppi().subscribe(
      res => {
        if (res !== null) {
          this.promociones = res;
          this.cantPromo = this.promociones.length;
        } else {
          this.toast.info('info', 'No existe Promociones', {
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
  backto() {
    this.location.back();
  }
}
