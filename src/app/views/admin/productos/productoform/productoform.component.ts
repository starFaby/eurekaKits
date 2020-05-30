import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Productoformvali } from 'src/app/validators/productoformvali';
import { MatDialogRef } from '@angular/material';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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
    private categoriaService: CategoriaService,
    private toast: ToastrService
  ) {
    this.formProducto = this.productoformvali.formProducto;
  }

  ngOnInit() {
    this.onGetCategoriasAll();
  }
  onGetCategoriasAll() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        if (res !== null) {
          this.arrayCategoria = res;
        } else {
          this.toast.success('Info', 'No existe Categorias', {
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
    if (this.formProducto.valid) {
      if (this.formProducto.get('idproducto').value == null) {
        const newProducto: Producto = {
          idcategoria: this.formProducto.get('idcategoria').value,
          nombre: this.formProducto.get('nombre').value,
          image: this.file,
          precio: this.formProducto.get('precio').value,
          stock: this.formProducto.get('stock').value,
          estado: this.formProducto.get('estado').value
        };
        this.productoService.onSaveProductos(newProducto).subscribe(
          res => {
            console.log(res);
            this.toast.success('Exito', 'Producto Agregado', {
              timeOut: 3000
            });
            this.onClose();
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
        this.onClose();
      } else {
        const idProducto = this.formProducto.get('idproducto').value;
        console.log(idProducto);
        const newProducto: Producto = {
          idcategoria: this.formProducto.get('idcategoria').value,
          nombre: this.formProducto.get('nombre').value,
          image: this.file,
          precio: this.formProducto.get('precio').value,
          stock: this.formProducto.get('stock').value,
          estado: this.formProducto.get('estado').value
        };
        console.log(newProducto);
        this.productoService.onUpdateProductos(idProducto, newProducto).subscribe(
          res => {
            console.log(res);
            this.toast.success('Exito', 'Producto Actualizado', {
              timeOut: 3000
            });
            this.onClose();
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
  }
  onClose() {
    this.formProducto.reset();
    this.productoformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
}
