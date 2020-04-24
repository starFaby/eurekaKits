import { Component, OnInit } from '@angular/core';
import { Productouni } from 'src/app/models/productouni';
import { Idfactura } from 'src/app/models/idfactura';
import { DetalleVenta } from 'src/app/models/detalleventa';
import { ActivatedRoute, Router } from '@angular/router';
import { DetaventaService } from 'src/app/services/detaventa.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Numfactura } from 'src/app/models/numfactura';
import { HttpErrorResponse } from '@angular/common/http';
import { Promouni } from 'src/app/models/promouni';

@Component({
  selector: 'app-clientpromo',
  templateUrl: './clientpromo.component.html',
  styleUrls: ['./clientpromo.component.scss']
})
export class ClientpromoComponent implements OnInit {
  id: string;
  promouni: Promouni[];
  idFactura: Idfactura[];
  cont = 1;
  dto = 1;
  numFactura;
  detalleVenta: DetalleVenta = {
    idfactura: '',
    idproducto: '',
    cantidad: 1,
    precio: '',
    total: 0,
    estado: '',
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  //  private productoService: ProductoService,
    private detaventaService: DetaventaService,
    private consultasService: ConsultasService
  ) {
  }
  API_URI_IMAGE = this.consultasService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetIdFactura();
    this.onGetPromocionuni();
  }
  onGetIdFactura() {
    this.consultasService.onGetIdFact().subscribe(
      res => {
        this.idFactura = res.map(t => t);
        console.log(this.idFactura);
        if (this.idFactura[0].idfactura == null) {
          this.detalleVenta.idfactura = '1';
          console.log('estoy vacio');
        } else {
          this.detalleVenta.idfactura = this.idFactura[0].idfactura;
          console.log('estoy lleno');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onGetNumFactura() {
    this.consultasService.onGetNumFact().subscribe(
      res => {
        console.log(res);
        this.onPrueba(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  onPrueba(res: Numfactura[]) {
    res.map(t => {
      if (t.numfactura == null) {
        this.detalleVenta.idfactura = '1';
        console.log('Estoy nulo', t.numfactura);
      } else {
        this.detalleVenta.idfactura = t.numfactura;
        console.log('estoy lleno', t.numfactura);
      }
    });
  }
  onGetPromocionuni() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.consultasService.onGetPromocionuni(this.id).subscribe(
          res => {
            console.log(res);
            this.promouni = res.map(t => t);
            this.detalleVenta.idproducto = this.promouni[0].idproducto;
            this.detalleVenta.estado = this.promouni[0].estado;
            this.detalleVenta.precio = this.promouni[0].precio;
            this.detalleVenta.total = this.promouni[0].precio  - (this.promouni[0].precio * (this.promouni[0].descuento / 100));
            console.log(this.promouni);
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 404) {
                console.log('No existe productos');
              }
            }
          }
        );
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            console.log('No existe productos');
          }
        }
      }
    );
  }
  onCountA() {
    this.cont++;
    // tslint:disable-next-line:radix
    if (this.cont > parseInt(this.promouni[0].stock)) {
      // tslint:disable-next-line:radix
      this.cont = parseInt(this.promouni[0].stock);
    }
    this.detalleVenta.cantidad = this.cont;
    // tslint:disable-next-line:max-line-length
    this.detalleVenta.total = this.cont * parseInt(this.promouni[0].precio) - (this.promouni[0].precio * (this.promouni[0].descuento / 100));

  }
  onCountD() {
    this.cont--;
    if (this.cont < 1) {
      this.cont = 1;
    }
    this.detalleVenta.cantidad = this.cont;
    // tslint:disable-next-line:radix
    // tslint:disable-next-line:max-line-length
    this.detalleVenta.total = this.cont * parseInt(this.promouni[0].precio) - (this.promouni[0].precio * (this.promouni[0].descuento / 100));
  }
  onCreate() {
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CanastaComponent, dialogConfig);*/
    this.router.navigate(['/canasta']);
  }
  submit() {
    console.log(this.detalleVenta);
  }
  onSubmit() {
  }

}
