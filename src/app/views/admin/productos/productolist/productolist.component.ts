import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoformComponent } from '../productoform/productoform.component';
import { Productoformvali } from 'src/app/validators/productoformvali';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productolist',
  templateUrl: './productolist.component.html',
  styleUrls: ['./productolist.component.scss']
})
export class ProductolistComponent implements OnInit {
  arreglo;
  productos: Producto[];
  file: File;
  constructor(
    private dialog: MatDialog,
    private productoService: ProductoService,
    private productoformvali: Productoformvali
  ) { }
  form = this.productoformvali.formProducto;
  listProductos: MatTableDataSource<any>;
  displayedColumns: string[] = ['categoria', 'nombre', 'image', 'precio', 'stock', 'estado', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.onGetProductosAll();
  }
  onGetProductosAll() {
    this.productoService.onGetProductos().subscribe(
      res => {
        this.productos = res;
        console.log(this.productos);
        this.listProductos = new MatTableDataSource(this.productos);
        this.listProductos.sort = this.sort;
        this.listProductos.paginator = this.paginator;
      },
      err => console.log(err)
    );
  }
  searchFiltrer() {
    this.listProductos.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.searchFiltrer();
  }
  onCreate() {
    this.productoformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProductoformComponent, dialogConfig);
  }
  onEdit(row) {
    const newproducto: Producto = {
      idproducto: row.idproducto,
      idcategoria: row.idcategoria,
      nombre: row.nombre,
      image: null,
      precio: row.precio,
      stock: row.stock,
      estado: row.estado
    };
    this.form.setValue(newproducto);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProductoformComponent, dialogConfig);
  }
  onDelete(row) {
    this.productoService.onDeleteProductos(row).subscribe(
      res => {
        console.log(res);
        this.onGetProductosAll();
      },
      err => console.log(err)
    );
  }
}
