import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { CategoriaformComponent } from '../categoriaform/categoriaform.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoriaformvali } from 'src/app/validators/categoriaformvali';
import { Categoria } from 'src/app/models/categoria';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorialist',
  templateUrl: './categorialist.component.html',
  styleUrls: ['./categorialist.component.scss']
})
export class CategorialistComponent implements OnInit {
  categoria: Categoria[];
  file: File;
  blobUrl;
  constructor(
    private dialog: MatDialog,
    private categoriaService: CategoriaService,
    private categoriaformvali: Categoriaformvali,
    private consultasService: ConsultasService,
    private router: Router) { }
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
    this.consultasService.onGetCategoria().subscribe(
      res => {
        if (res != null) {
          this.categoria = res;
          this.listCategoria = new MatTableDataSource(this.categoria);
          this.listCategoria.sort = this.sort;
          this.listCategoria.paginator = this.paginator;
        } else {
          this.onCreate();
          this.router.navigate(['/nofound']);
          console.log('No datos');
        }
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
  onEdit(row) {
    const newCategoria: Categoria = {
      idcategoria: row.idcategoria,
      nombre: row.nombre,
      image: null,
      estado: row.estado
    };
    this.form.setValue(newCategoria);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CategoriaformComponent, dialogConfig);
  }
  onDelete(id) {
    const newCategoria: Categoria = {
      estado: 0
    };
    this.categoriaService.onDeleteCategoria(id, newCategoria).subscribe(
      res => {
        console.log(res);
        this.onGetCategoriasAll();
      },
      err => console.log(err)
    );
  }
}
