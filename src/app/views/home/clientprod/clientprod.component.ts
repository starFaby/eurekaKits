import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CateproduService } from 'src/app/services/cateprodu.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-clientprod',
  templateUrl: './clientprod.component.html',
  styleUrls: ['./clientprod.component.scss']
})
export class ClientprodComponent implements OnInit {
  id: string;
  product: Producto;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productoService: ProductoService) { }
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

}
