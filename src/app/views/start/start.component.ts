import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Promocionppi } from 'src/app/models/promocionppi';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  promociones: Promocionppi[];
  constructor(private consultasService: ConsultasService, private router: Router) { }
  API_URI_IMAGE = this.consultasService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetPromocionesppi();
  }
  onGetPromocionesppi() {
    this.consultasService.onGetPromocionppi().subscribe(
      res => {
        this.promociones = res;
        console.log(this.promociones);
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
  onSelectedProducto(id: string) {
    this.router.navigate(['/clientPromo', id]);
  }

}
