import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Promocionppi } from 'src/app/models/promocionppi';
import { HttpErrorResponse } from '@angular/common/http';
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
    private consultasService: ConsultasService) {

  }
  ngOnInit() {
    this.onGetPromocionesppi();
  }
  onGetPromocionesppi() {
    this.consultasService.onGetPromocionppi().subscribe(
      res => {
        if (res != null) {
          this.promociones = res;
          this.cantPromo = this.promociones.length;
          console.log(this.promociones.length);
        } else {
          console.log('No existe Promociones');
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            console.log('No existe promociones');
          }

        }
      }
    );
  }
  backto() {
    this.location.back();
  }
}
