import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { CategoriaformComponent } from '../categoriaform/categoriaform.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoriaformvali } from 'src/app/validators/categoriaformvali';
import { Categoria } from 'src/app/models/categoria';
import { LoginComponent } from 'src/app/views/login/login.component';

@Component({
  selector: 'app-categorialist',
  templateUrl: './categorialist.component.html',
  styleUrls: ['./categorialist.component.scss']
})
export class CategorialistComponent implements OnInit {
  arreglo;
  categoria: Categoria;
  file: File;
  constructor(private dialog: MatDialog,
              private categoriaService: CategoriaService,
              private categoriaformvali: Categoriaformvali) { }
  form = this.categoriaformvali.formCategoria;
  listCategoria: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'image', 'estado', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.onGetCategoriasAll();
  }
  onGetCategoriasAll() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        this.arreglo = res;
        this.listCategoria = new MatTableDataSource(this.arreglo);
        this.listCategoria.sort = this.sort;
        this.listCategoria.paginator = this.paginator;
      },
      err => console.log(err)
    );
  }
  searchFiltrer() {
    this.listCategoria.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate() {
    this.categoriaformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CategoriaformComponent, dialogConfig);
  }
  onCreateLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(LoginComponent, dialogConfig);
  }
  async onEdit(row) {
    const fileR = 'http://localhost:3000' + row.image;
    const response = await fetch(fileR);
    const data = await response.blob();
    const metadata = {
      type: 'image/jpeg'
    };
    this.file = new File([data], row.nombre, metadata);
    console.log('============>>>>');
    console.log(this.file);
    this.categoria = {
      idCategoria: row.idCategoria,
      nombre: row.nombre,
      image: this.file,
      estado: row.estado
    };
    console.log('soy la imagen que me muestra');
    console.log(this.categoria.image);
    console.log('soy el row ');
    console.log(row);
    console.log(' soy categoria');
    console.log(this.categoria);
    this.form.setValue(this.categoria);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CategoriaformComponent, dialogConfig);
  }
  onDelete(row) {
    this.categoriaService.onDeleteCategoria(row).subscribe(
      res => {
        console.log(res);
        this.onGetCategoriasAll();
      },
      err => console.log(err)
    );
  }
}
