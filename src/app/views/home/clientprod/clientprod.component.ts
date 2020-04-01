import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CateproduService } from 'src/app/services/cateprodu.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CanastaComponent } from '../canasta/canasta.component';

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
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productoService: ProductoService,
              private dialog: MatDialog) { }
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
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(CanastaComponent, dialogConfig);
    }

}
