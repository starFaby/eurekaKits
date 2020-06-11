import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Promocionppi } from 'src/app/models/promocionppi';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  promociones: Promocionppi[];
  constructor(
    private consultasService: ConsultasService,
    private router: Router,
    private toast: ToastrService) { }
  API_URI_IMAGE = this.consultasService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetPromocionesppi();
  }
  onGetPromocionesppi() {
    this.consultasService.onGetPromocionppi().subscribe(
      res => {
        console.log(res);
        if (res != null) {
          this.promociones = res;
          this.toast.success('Exist', 'Promociones', {
            timeOut: 3000
          });
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
  onSelectedProducto(id: string) {
    this.router.navigate(['/clientPromo', btoa(id)]);
  }

}
