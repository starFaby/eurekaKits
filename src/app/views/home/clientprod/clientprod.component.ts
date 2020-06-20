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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientprod',
  templateUrl: './clientprod.component.html',
  styleUrls: ['./clientprod.component.scss']
})
export class ClientprodComponent implements OnInit {
  id: string;
  productuni: Productouni[];
  numFactura: Numfactura[];
  cont = 1;
  dto = 1;
  viewBotonLogin;
  viewBotonFactura;
  viewBotonCarroCanasta;
  factura: Factura = {
    idpersona: '',
    numfactura: '',
    estado: 1
  };
  detalleVentas: DetalleVentas = {
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
    private detaventaformvali: Detaventaformvali,
    private detaventaService: DetaventaService,
    private consultasService: ConsultasService,
    private facturaService: FacturaService,
    private toast: ToastrService
  ) {
    this.formDetaVenta = this.detaventaformvali.formDetaVenta;
  }
  API_URI_IMAGE = this.productoService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetProductouni();
    this.onGetValiBottom();
  }
  onGetProductouni() {
    this.activatedRoute.params.subscribe(
      params => {
        // tslint:disable-next-line:no-string-literal
        this.id = atob(params['id']);
        this.consultasService.onGetproductouni(this.id).subscribe(
          res => {
            if (res !== null) {
              this.productuni = res.map(t => t);
              this.detalleVentas.idproducto = this.productuni[0].idproducto;
              this.detalleVentas.estado = this.productuni[0].estado;
              this.detalleVentas.precio = this.productuni[0].precio;
              this.detalleVentas.total = this.productuni[0].precio;
            } else {
              this.toast.info('Lo siento', 'Existe un error en el producto', {
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
  onGetViewCanasta() {
    if (localStorage.getItem('idfactura') != null && localStorage.getItem('idpersona') != null) {
      this.toast.info('Elejiste', 'Tus compras se visualizan aqui', {
        timeOut: 3000
      });
      this.router.navigate(['/canasta']);
    } else {
      this.onGetLogin();
    }
  }
  onGetValiBottom() {
    if (localStorage.getItem('idpersona') != null) {
      this.viewBotonLogin = false;
      this.viewBotonFactura = true;
      this.viewBotonCarroCanasta = false;
    } else if (localStorage.getItem('idpersona') == null) {
      this.viewBotonLogin = true;
      this.viewBotonFactura = false;
      this.viewBotonCarroCanasta = false;
    }
    if (localStorage.getItem('idfactura') != null) {
      this.viewBotonLogin = false;
      this.viewBotonFactura = false;
      this.viewBotonCarroCanasta = true;
    } else if (localStorage.getItem('idfactura') == null) {
      this.viewBotonLogin = false;
      this.viewBotonFactura = true;
      this.viewBotonCarroCanasta = false;
    }
    if (localStorage.getItem('idpersona') != null && localStorage.getItem('idfactura') != null) {
      this.viewBotonLogin = false;
      this.viewBotonFactura = false;
      this.viewBotonCarroCanasta = true;
    } else if (localStorage.getItem('idpersona') == null && localStorage.getItem('idfactura') == null) {
      this.viewBotonLogin = true;
      this.viewBotonFactura = false;
      this.viewBotonCarroCanasta = false;
    }
  }
  onsaveFactura() {
    if (localStorage.getItem('idpersona') != null) {
      this.consultasService.onGetNumFact().subscribe(
        res => {
          this.numFactura = res.map(t => t);
          if (this.numFactura[0].numfactura != null) {
            this.factura.idpersona = localStorage.getItem('idpersona');
            this.factura.numfactura = this.numFactura[0].numfactura;
            this.facturaService.onSaveFactura(this.factura).subscribe(
              dates => {
                // tslint:disable-next-line:no-string-literal
                localStorage.setItem('idfactura', dates['result']);
                this.onGetValiBottom();
                this.toast.success(`N° Factura es: ${this.factura.numfactura}`, 'Factura creada', {
                  timeOut: 3000
                });
                this.toast.info('Elija', 'Puede ahora añadir a la cesta', {
                  timeOut: 3000
                });
              },
              err => {
                console.log(err);
              }
            );
          } else {
            this.factura.idpersona = localStorage.getItem('idpersona');
            this.factura.numfactura = 1;
            this.facturaService.onSaveFactura(this.factura).subscribe(
              dates => {
                console.log(dates);
                // tslint:disable-next-line:no-string-literal
                localStorage.setItem('idfactura', '1'); // dates['idfactura']
                this.onGetValiBottom();
                this.toast.success(`N° Factura es: ${this.factura.numfactura}`, 'Factura creada', {
                  timeOut: 3000
                });
                this.toast.info('Elija', 'Puede ahora añadir a la cesta', {
                  timeOut: 3000
                });
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
    } else {
      this.onGetLogin();
    }
  }

  onSubmit() {
    if (localStorage.getItem('idpersona') != null) {
      if (localStorage.getItem('idfactura') != null && localStorage.getItem('idpersona') != null) {
        this.detalleVentas.idfactura = localStorage.getItem('idfactura');
        this.detaventaService.onSaveDetaVenta(this.detalleVentas).subscribe(
          res => {
            if (res !== null) {
              console.log(res);
              this.toast.info('Producto', 'Añadido a la cesta', {
                timeOut: 3000
              });
              const id = this.detalleVentas.idproducto;
              const stockFin = this.productuni[0].stock - this.detalleVentas.cantidad;
              const newProducto: Producto = {
                stock: stockFin
              };
              this.productoService.onUpdateStock(id, newProducto).subscribe(
                resS => {
                  if (resS !== null) {
                    this.toast.success('Stock', 'Actualizado', {
                      timeOut: 3000
                    });
                  } else {
                    this.toast.warning('Error', 'Error slActualizado', {
                      timeOut: 3000
                    });
                  }
                }
              );
            } else {
              this.toast.warning('Producto', 'No se pudo añadir', {
                timeOut: 3000
              });
            }
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.onGetLogin();
              }
            }
          }
        );
      } else {
        this.onGetLogin();
      }
    } else {
      this.onGetLogin();
    }
  }
  onGetLogin() {
    this.router.navigate(['/login']);
  }
}
