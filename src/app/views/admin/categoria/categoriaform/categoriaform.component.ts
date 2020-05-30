import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categoriaformvali } from 'src/app/validators/categoriaformvali';
import { MatDialogRef } from '@angular/material';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categoriaform',
  templateUrl: './categoriaform.component.html',
  styleUrls: ['./categoriaform.component.scss']
})
export class CategoriaformComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer;
  formCategoria: FormGroup;
  constructor(
    private categoriaformvali: Categoriaformvali,
    private matDialogRef: MatDialogRef<CategoriaformComponent>,
    private categoriaService: CategoriaService,
    private toast: ToastrService
  ) {
    this.formCategoria = this.categoriaformvali.formCategoria;
  }

  ngOnInit() {

  }
  onPhotoSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
  onSubmit() {
    if (this.formCategoria.valid) {
      if (this.formCategoria.get('idcategoria').value == null) {
        const newCategoria: Categoria = {
          nombre: this.formCategoria.get('nombre').value,
          image: this.file,
          estado: this.formCategoria.get('estado').value
        };
        this.categoriaService.onSaveCategoria(newCategoria).subscribe(
          res => {
            if (res !== null) {
              this.toast.success('Exito', 'Categoria Agregada', {
                timeOut: 3000
              });
              this.onCloseCategoriaForm();
            } else {
              this.toast.error('Error', 'Error a Agregar', {
                timeOut: 3000
              });
              this.onCloseCategoriaForm();
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
        this.onCloseCategoriaForm();
      } else {
        const idCategoria = this.formCategoria.get('idcategoria').value;
        const newCategoria: Categoria = {
          nombre: this.formCategoria.get('nombre').value,
          image: this.file,
          estado: this.formCategoria.get('estado').value
        };
        this.categoriaService.onUpdateCategoria(idCategoria, newCategoria).subscribe(
          res => {
            if (res === true) {
              this.toast.success('Exito', 'Categoria Actualizada', {
                timeOut: 3000
              });
              this.onCloseCategoriaForm();
            } else {
              this.toast.error('Error', 'Error a Actualizar', {
                timeOut: 3000
              });
              this.onCloseCategoriaForm();
            }
            this.onCloseCategoriaForm();
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
        this.formCategoria.reset();
        this.categoriaformvali.oninitializeFomrGroup();
        this.onCloseCategoriaForm();
      }
    }
  }
  onCloseCategoriaForm() {
    this.formCategoria.reset();
    this.categoriaformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
}
