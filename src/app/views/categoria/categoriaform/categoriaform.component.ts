import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categoriaformvali } from 'src/app/validators/categoriaformvali';
import { MatDialogRef } from '@angular/material';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { CategorialistComponent } from '../categorialist/categorialist.component';

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
    private categoriaService: CategoriaService
  ) {
    this.formCategoria = categoriaformvali.formCategoria;
  }

  ngOnInit() {

  }
  onCloseDialog() {
    this.categoriaformvali.formCategoria.reset();
    this.categoriaformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
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
    if (this.categoriaformvali.formCategoria.valid) {
      if (this.categoriaformvali.formCategoria.get('idCategoria').value == null) {
        const newCategoria: Categoria = {
          nombre: this.categoriaformvali.formCategoria.get('nombre').value,
          image: this.file,
          estado: this.categoriaformvali.formCategoria.get('estado').value
        };
        this.categoriaService.onSaveCategoria(newCategoria).subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
        );
        this.categoriaformvali.formCategoria.reset();
        this.categoriaformvali.oninitializeFomrGroup();
        this.onClose();
      } else {
        const idCategoria = this.categoriaformvali.formCategoria.get('idCategoria').value;
        console.log(idCategoria);
        const newCategoria: Categoria = {
          nombre: this.categoriaformvali.formCategoria.get('nombre').value,
          image: this.file,
          estado: this.categoriaformvali.formCategoria.get('estado').value
        };
        console.log(newCategoria);
        this.categoriaService.onUpdateCategoria(idCategoria, newCategoria).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        this.categoriaformvali.formCategoria.reset();
        this.categoriaformvali.oninitializeFomrGroup();
        this.onClose();
      }
    }
  }
  onClose() {
    this.categoriaformvali.formCategoria.reset();
    this.categoriaformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
}
