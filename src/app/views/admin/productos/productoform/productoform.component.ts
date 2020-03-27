import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Productoformvali } from 'src/app/validators/productoformvali';
import { MatDialogRef } from '@angular/material';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-productoform',
  templateUrl: './productoform.component.html',
  styleUrls: ['./productoform.component.scss']
})
export class ProductoformComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer;
  formProducto: FormGroup;
  arrayCategoria;
  constructor(
    private productoformvali: Productoformvali,
    private matDialogRef: MatDialogRef<ProductoformComponent>,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {
    this.formProducto = this.productoformvali.formProducto;
  }

  ngOnInit() {
    this.onGetCategoriasAll();
  }
  onGetCategoriasAll() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        this.arrayCategoria = res;
      },
      err => console.log(err)
    );
  }
  onCloseDialog() {
    this.productoformvali.formProducto.reset();
    this.productoformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
  onPhotoSelected(event): void {
    console.log('entraste al evento', event);
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
  onSubmit() {
    console.log(this.productoformvali.formProducto.value);
    if (this.productoformvali.formProducto.valid) {
      if (this.productoformvali.formProducto.get('idProducto').value == null) {
        const newProducto: Producto = {
          idCategoria: this.productoformvali.formProducto.get('idCategoria').value,
          nombre: this.productoformvali.formProducto.get('nombre').value,
          image: this.file,
          precio: this.productoformvali.formProducto.get('precio').value,
          stock: this.productoformvali.formProducto.get('stock').value,
          estado: this.productoformvali.formProducto.get('estado').value
        };
        this.productoService.onSaveProductos(newProducto).subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
        );
        this.productoformvali.formProducto.reset();
        this.productoformvali.oninitializeFomrGroup();
        this.onClose();
      } else {
        const idProducto = this.productoformvali.formProducto.get('idProducto').value;
        console.log(idProducto);
        const newProducto: Producto = {
          idCategoria: this.productoformvali.formProducto.get('idCategoria').value,
          nombre: this.productoformvali.formProducto.get('nombre').value,
          image: this.file,
          precio: this.productoformvali.formProducto.get('precio').value,
          stock: this.productoformvali.formProducto.get('stock').value,
          estado: this.productoformvali.formProducto.get('estado').value
        };
        console.log(newProducto);
        this.productoService.onUpdateProductos(idProducto, newProducto).subscribe(
          res => {
            this.productoformvali.formProducto.reset();
            this.productoformvali.oninitializeFomrGroup();
            this.onClose();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
  onClose() {
    this.productoformvali.formProducto.reset();
    this.productoformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
}
