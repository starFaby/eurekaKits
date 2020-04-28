import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { DetaventaService } from 'src/app/services/detaventa.service';
import { Producto } from 'src/app/models/producto';
import { Factura } from 'src/app/models/factura';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CanastaComponent } from '../canasta/canasta.component';
import { FormGroup } from '@angular/forms';
import { Detaventaformvali } from 'src/app/validators/detaventaformvali';
import { DetalleVentas } from 'src/app/models/detalleventa';
import { HttpErrorResponse } from '@angular/common/http';
import { Numfactura } from 'src/app/models/numfactura';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Productouni } from 'src/app/models/productouni';
import { Idfactura } from 'src/app/models/idfactura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-clientprod',
  templateUrl: './clientprod.component.html',
  styleUrls: ['./clientprod.component.scss']
})
export class ClientprodComponent implements OnInit {
  id: string;
  productuni: Productouni[];
  idFactura: Idfactura[];
  numFactura: Numfactura[];
  cont = 1;
  dto = 1;
  factura: Factura = {
    idpersona: '',
    numfactura: '',
    estado: 1
  };
  detalleVentas: DetalleVentas = {
    idproducto: '',
    idfactura: '',
    cantidad: 1,
    precio: '',
    total: 0,
    estado: '',
  };
  formDetaVenta: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private dialog: MatDialog,
    private detaventaformvali: Detaventaformvali,
    private detaventaService: DetaventaService,
    private consultasService: ConsultasService,
    private facturaService: FacturaService
  ) {
    this.formDetaVenta = this.detaventaformvali.formDetaVenta;
  }
  API_URI_IMAGE = this.productoService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetProductouni();
  }
  onGetIdFacturaConsult(res) {
    // this.idFactura
  }

  onPrueba(res: Numfactura[]) {
    res.map(t => {
      if (t.numfactura == null) {
        this.detalleVentas.idfactura = '1';
        console.log('Estoy nulo', t.numfactura);
      } else {
        this.detalleVentas.idfactura = t.numfactura;
        console.log('estoy lleno', t.numfactura);
      }
    });
  }
  onGetProductouni() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.consultasService.onGetproductouni(this.id).subscribe(
          res => {
            this.productuni = res.map(t => t);
            this.detalleVentas.idproducto = this.productuni[0].idproducto;
            this.detalleVentas.estado = this.productuni[0].estado;
            this.detalleVentas.precio = this.productuni[0].precio;
            this.detalleVentas.total = this.productuni[0].precio;
            console.log(this.productuni);
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
    if (this.cont > parseInt(this.productuni[0].stock)) {
      // tslint:disable-next-line:radix
      this.cont = parseInt(this.productuni[0].stock);
    }
    this.detalleVentas.cantidad = this.cont;
    // tslint:disable-next-line:radix
    this.detalleVentas.total = this.cont * parseInt(this.productuni[0].precio);

  }
  onCountD() {
    this.cont--;
    if (this.cont < 1) {
      this.cont = 1;
    }
    this.detalleVentas.cantidad = this.cont;
    // tslint:disable-next-line:radix
    this.detalleVentas.total = this.cont * parseInt(this.productuni[0].precio);
  }
  onCreate() {
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CanastaComponent, dialogConfig);*/
    this.router.navigate(['/canasta']);
  }
  onsaveDetalleVenta() {
    this.detalleVentas.idfactura = localStorage.getItem('idfactura');
    this.detaventaService.onSaveDetaVenta(this.detalleVentas).subscribe(
      res => {
        console.log(res);
        console.log('entraste a detalle venta');
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
  onsaveFactura() {
    this.consultasService.onGetNumFact().subscribe(
      res => {
        console.log(res);
        this.numFactura = res.map(t => t);
        if (localStorage.getItem('id') != null) {
          console.log('Usuario', localStorage.getItem('id'));
          if (this.numFactura[0].numfactura != null) {
            this.factura.idpersona = localStorage.getItem('id');
            this.factura.numfactura = this.numFactura[0].numfactura;
            this.facturaService.onSaveFactura(this.factura).subscribe(
              dates => {
                console.log(dates);
                localStorage.setItem('idfactura', dates['idfactura']);
              },
              err => {
                console.log(err);
              }
            );
          } else {
            this.factura.idpersona = localStorage.getItem('id');
            this.factura.numfactura = 1;
            this.facturaService.onSaveFactura(this.factura).subscribe(
              dates => {
                console.log(dates);
                localStorage.setItem('idfactura', dates['idfactura']);
              },
              err => {
                console.log(err);
              }
            );
          }
        } else {
          localStorage.removeItem('id');
          console.log('No existe usuario');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    console.log('vas a enviar');
    console.log(localStorage.getItem('idfactura'));
    if (localStorage.getItem('idfactura') != null) {
      /*************************************** */
      /** cuando existe la id de la factura */
      /*************************************** */
      console.log('existe la id');
      this.onsaveDetalleVenta();
    } else {
      /*************************************** */
      /** cuando NO existe la id de la factura */
      /*************************************** */
      console.log('NO existe la id');
      this.onsaveFactura();
    }
  }

}
