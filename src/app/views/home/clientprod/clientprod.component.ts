import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { DetaventaService } from 'src/app/services/detaventa.service';
import { Producto } from 'src/app/models/producto';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CanastaComponent } from '../canasta/canasta.component';
import { FormGroup } from '@angular/forms';
import { Detaventaformvali } from 'src/app/validators/detaventaformvali';
import { DetalleVenta } from 'src/app/models/detalleventa';
import { HttpErrorResponse } from '@angular/common/http';
import { Numfactura } from 'src/app/models/numfactura';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Productouni } from 'src/app/models/productouni';
import { Idfactura } from 'src/app/models/idfactura';

@Component({
  selector: 'app-clientprod',
  templateUrl: './clientprod.component.html',
  styleUrls: ['./clientprod.component.scss']
})
export class ClientprodComponent implements OnInit {
  id: string;
  productuni: Productouni[];
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
  formDetaVenta: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private dialog: MatDialog,
    private detaventaformvali: Detaventaformvali,
    private detaventaService: DetaventaService,
    private consultasService: ConsultasService
  ) {
    this.formDetaVenta = this.detaventaformvali.formDetaVenta;
  }
  API_URI_IMAGE = this.productoService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetProductouni();
    this.onGetIdFactura();
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
  onGetIdFacturaConsult(res) {
    // this.idFactura
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
  onGetProductouni() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.consultasService.onGetproductouni(this.id).subscribe(
          res => {
            this.productuni = res.map(t => t);
            this.detalleVenta.idproducto = this.productuni[0].idproducto;
            this.detalleVenta.estado = this.productuni[0].estado;
            this.detalleVenta.precio = this.productuni[0].precio;
            this.detalleVenta.total = this.productuni[0].precio;
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
    this.detalleVenta.cantidad = this.cont;
    // tslint:disable-next-line:radix
    this.detalleVenta.total = this.cont * parseInt(this.productuni[0].precio);

  }
  onCountD() {
    this.cont--;
    if (this.cont < 1) {
      this.cont = 1;
    }
    this.detalleVenta.cantidad = this.cont;
    // tslint:disable-next-line:radix
    this.detalleVenta.total = this.cont * parseInt(this.productuni[0].precio);
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
    if (this.formDetaVenta.valid) {
      if (this.formDetaVenta.get('iddetalleventa').value == null) {
        const newDetalleVenta: DetalleVenta = {
          idfactura: this.formDetaVenta.get('idfactura').value,
          idproducto: this.formDetaVenta.get('idproducto').value,
          cantidad: this.formDetaVenta.get('cantidad').value,
          precio: this.formDetaVenta.get('precio').value,
          total: this.formDetaVenta.get('total').value,
          estado: this.formDetaVenta.get('estado').value
        };
        this.detaventaService.onSaveDetaVenta(newDetalleVenta).subscribe(
          res => {
            console.log(res);
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
    }
  }

}
