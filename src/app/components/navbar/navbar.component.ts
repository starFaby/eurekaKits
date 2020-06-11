import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ToastrService } from 'ngx-toastr';
import { Promocionppi } from 'src/app/models/promocionppi';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  promociones: Promocionppi[];
  cantPromo;
  constructor(
    public authService: AuthService,
    private consultasService: ConsultasService,
    private toast: ToastrService) { }

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
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
