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
import { Formapago } from 'src/app/models/formapago';

@Component({
  selector: 'app-clientprod',
  templateUrl: './clientprod.component.html',
  styleUrls: ['./clientprod.component.scss']
})
export class ClientprodComponent implements OnInit {
  id: string;
  product: Producto;
  cont = 1;
  monto;
  estado = 1;
  numFactura = 1;
  formapago: Formapago[] = [];
  formDetaVenta: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productoService: ProductoService,
              private dialog: MatDialog,
              private detaventaformvali: Detaventaformvali,
              private detaventaService: DetaventaService
    ) {
    this.formDetaVenta = this.detaventaformvali.formDetaVenta;
  }
  API_URI_IMAGE = this.productoService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetProducto();
  }
  onGetProducto() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.productoService.onGetProducto(this.id).subscribe(
          res => {
            this.product = res;
            console.log('======>  ', this.product);
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }
  onCountA() {
    this.cont++;
    // tslint:disable-next-line:radix
    if (this.cont > parseInt(this.product.stock)) {
      // tslint:disable-next-line:radix
      this.cont = parseInt(this.product.stock);
    }
    // tslint:disable-next-line:radix
    this.monto = this.cont * parseInt(this.product.precio);

  }
  onCountD() {
    this.cont--;
    if (this.cont < 1) {
      this.cont = 1;
    }
    // tslint:disable-next-line:radix
    this.monto = this.cont * parseInt(this.product.precio);
  }
  onCreate() {
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CanastaComponent, dialogConfig);*/
    this.router.navigate(['/canasta']);
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
          estado: this.formDetaVenta.get('total').value
        };
        this.detaventaService.onSaveDetaVenta(newDetalleVenta).subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
        );
      }
    }
  }

}
