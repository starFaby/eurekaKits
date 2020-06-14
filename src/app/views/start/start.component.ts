import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Promocionppi } from 'src/app/models/promocionppi';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion';

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
    private toast: ToastrService,
    private promocionService: PromocionService) { }
  API_URI_IMAGE = this.consultasService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetPromocionesppi();
  }
  onGetPromocionesppi() {
    this.consultasService.onGetPromocionppi().subscribe(
      res => {
        if (res != null) {
          this.promociones = res;
          this.onGetUpdatePromociones(this.promociones);
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
  onGetUpdatePromociones(promocionppi: Promocionppi[]) {
    const updateDate = new Date();
    const fechaActual = updateDate.getFullYear() + updateDate.getMonth() + updateDate.getDay();
    for (const iterator of promocionppi) {
      const id = iterator.idpromociones;
      const aux = new Date(iterator.fechafin);
      const fechaFin = aux.getFullYear() + aux.getMonth() + aux.getDay();
      if (fechaActual > fechaFin) {
        this.onDelete(id);
      }
    }
  }
  onDelete(id) {
    const newPromocion: Promocion = {
      estado: 0
    };
    this.promocionService.onDeletePromocion(id, newPromocion).subscribe(
      res => {
        if (res !== null) {
          this.toast.success('Exito', 'Promoción Eliminada', {
            timeOut: 3000
          });
        } else {
          this.toast.success('Info', 'No se puede modificar', {
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
}
