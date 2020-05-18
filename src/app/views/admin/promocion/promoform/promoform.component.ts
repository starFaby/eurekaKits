import { Component, OnInit } from '@angular/core';
import { Promoformvali } from 'src/app/validators/promoformvali';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Router } from '@angular/router';

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
    private router: Router
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
          },
          err => console.log(err)
        );
        this.onClosePromoForm();
      } else {
        const idPromociones = this.formPromo.get('idpromociones').value;
        console.log('fromulario', idPromociones);
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
          },
          err => {
            console.log(err);
          }
        );
        this.promoformvali.formPromo.reset();
        this.promoformvali.oninitializeFomrGroup();
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
        this.arregloProducto = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
