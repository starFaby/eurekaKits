import { Component, OnInit } from '@angular/core';
import { Productouni } from 'src/app/models/productouni';
import { Idfactura } from 'src/app/models/idfactura';
import { DetalleVentas } from 'src/app/models/detalleventa';
import { ActivatedRoute, Router } from '@angular/router';
import { DetaventaService } from 'src/app/services/detaventa.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Numfactura } from 'src/app/models/numfactura';
import { HttpErrorResponse } from '@angular/common/http';
import { Promouni } from 'src/app/models/promouni';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-clientpromo',
  templateUrl: './clientpromo.component.html',
  styleUrls: ['./clientpromo.component.scss']
})
export class ClientpromoComponent implements OnInit {
  id: string;
  promouni: Promouni[];
  idFactura: Idfactura[];
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private detaventaService: DetaventaService,
    private consultasService: ConsultasService,
    private facturaService: FacturaService,
    private toast: ToastrService
  ) {
  }
  API_URI_IMAGE = this.consultasService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetPromocionuni();
    this.onGetValiBottom();
  }
  onGetPromocionuni() {
    this.activatedRoute.params.subscribe(
      params => {
        // tslint:disable-next-line:no-string-literal
        this.id = atob(params['id']);
        this.consultasService.onGetPromocionuni(this.id).subscribe(
          res => {
            console.log(res);
            if (res !== null) {
              this.promouni = res.map(t => t);
              this.detalleVentas.idproducto = this.promouni[0].idproducto;
              this.detalleVentas.estado = this.promouni[0].estado;
              this.detalleVentas.precio = this.promouni[0].precio;
              this.detalleVentas.total = this.promouni[0].precio - (this.promouni[0].precio * (this.promouni[0].dto / 100));
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
    if (this.cont > parseInt(this.promouni[0].stock)) {
      // tslint:disable-next-line:radix
      this.cont = parseInt(this.promouni[0].stock);
    }
    this.detalleVentas.cantidad = this.cont;
    // tslint:disable-next-line:max-line-length
    this.detalleVentas.total = this.cont * parseInt(this.promouni[0].precio) - (this.promouni[0].precio * (this.promouni[0].dto / 100));

  }
  onCountD() {
    this.cont--;
    if (this.cont < 1) {
      this.cont = 1;
    }
    this.detalleVentas.cantidad = this.cont;
    // tslint:disable-next-line:radix
    // tslint:disable-next-line:max-line-length
    this.detalleVentas.total = this.cont * parseInt(this.promouni[0].precio) - (this.promouni[0].precio * (this.promouni[0].dto / 100));
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
          console.log(res);
          this.numFactura = res.map(t => t);
          if (this.numFactura[0].numfactura != null) {
            this.factura.idpersona = localStorage.getItem('idpersona');
            this.factura.numfactura = this.numFactura[0].numfactura;
            this.facturaService.onSaveFactura(this.factura).subscribe(
              dates => {
                console.log(dates);
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
          console.log(err);
        }
      );
    } else {
      this.onGetLogin();
    }
  }

  onCreate() {
    this.router.navigate(['/canasta']);
  }

  onSubmit() {
    if (localStorage.getItem('idpersona') != null) {
      if (localStorage.getItem('idfactura') != null && localStorage.getItem('idpersona') != null) {
        this.detalleVentas.idfactura = localStorage.getItem('idfactura');
        this.detaventaService.onSaveDetaVenta(this.detalleVentas).subscribe(
          res => {
            if (res !== null) {
              this.toast.info('Producto', 'Añadido a la cesta', {
                timeOut: 3000
              });
              const id = this.detalleVentas.idproducto;
              const stockFin = this.promouni[0].stock - this.detalleVentas.cantidad;
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
              this.toast.info('Info', 'No se pudo añadir a la cesta', {
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
