import { Component, OnInit } from '@angular/core';
import { Promoformvali } from 'src/app/validators/promoformvali';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-promoform',
  templateUrl: './promoform.component.html',
  styleUrls: ['./promoform.component.scss']
})
export class PromoformComponent implements OnInit {
  formPromo: FormGroup;
  arregloProducto: Producto[];
  constructor(
    private promoformvali: Promoformvali,
    private matDialogRef: MatDialogRef<PromoformComponent>,
    private promocionService: PromocionService,
    private productoService: ProductoService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.formPromo = this.promoformvali.formPromo;
  }

  ngOnInit() {
    this.onGetProducto();
  }
  onSubmit() {
    if (this.formPromo.valid) {
      if (this.formPromo.get('idpromociones').value == null) {
        const newPromocion: Promocion = {
          idproducto: this.formPromo.get('idproducto').value,
          dto: this.formPromo.get('dto').value,
          fechainicio: this.formPromo.get('fechainicio').value,
          fechafin: this.formPromo.get('fechafin').value,
          descripcion: this.formPromo.get('descripcion').value,
          estado: this.formPromo.get('estado').value,
        };
        this.promocionService.onSavePromocion(newPromocion).subscribe(
          res => {
            console.log(res);
            this.toast.success('Exito', 'Promocion Agregada', {
              timeOut: 3000
            });
            this.onClosePromoForm();
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
        this.onClosePromoForm();
      } else {
        const idPromociones = this.formPromo.get('idpromociones').value;
        const newPromocion: Promocion = {
          idproducto: this.formPromo.get('idproducto').value,
          dto: this.formPromo.get('dto').value,
          fechainicio: this.formPromo.get('fechainicio').value,
          fechafin: this.formPromo.get('fechafin').value,
          descripcion: this.formPromo.get('descripcion').value,
          estado: this.formPromo.get('estado').value,
        };
        console.log('fromulario', newPromocion);
        this.promocionService.onUpdatePromocion(idPromociones, newPromocion).subscribe(
          res => {
            console.log(res);
            this.toast.success('Exito', 'Promocion Actualizada', {
              timeOut: 3000
            });
            this.onClosePromoForm();
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
        this.onClosePromoForm();
      }
    }
  }
  onClosePromoForm() {
    this.promoformvali.formPromo.reset();
    this.promoformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
  onGetProducto() {
    this.productoService.onGetProductos().subscribe(
      res => {
        if (res !== null) {
          this.arregloProducto = res;
        } else {
          this.toast.info('Info', 'No existe productos', {
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

}
