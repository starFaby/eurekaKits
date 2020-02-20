import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CategoriaformComponent } from '../categoriaform/categoriaform.component';

@Component({
  selector: 'app-categorialist',
  templateUrl: './categorialist.component.html',
  styleUrls: ['./categorialist.component.scss']
})
export class CategorialistComponent implements OnInit {
  arreglo;
  constructor(private dialog: MatDialog) { }
  listEstudiante: MatTableDataSource<any>;
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'direccion', 'genero', 'fechaN', 'estado', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
  }
  searchFiltrer() {
    this.listEstudiante.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate(){
    // this.validatorsestudiante.initializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CategoriaformComponent, dialogConfig);
  }
}
