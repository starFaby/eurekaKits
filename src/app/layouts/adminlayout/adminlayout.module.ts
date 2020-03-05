import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AdminlayoutRoutingModule } from './adminlayout-routing.module';
import { StartComponent } from 'src/app/views/start/start.component';
import { ProductosComponent } from 'src/app/views/productos/productos.component';
import { MaterialModule } from 'src/app/imports/material.module';
import { CategoriaComponent } from 'src/app/views/categoria/categoria.component';
import { CategorialistComponent } from 'src/app/views/categoria/categorialist/categorialist.component';
import { CategoriaformComponent } from 'src/app/views/categoria/categoriaform/categoriaform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductolistComponent } from 'src/app/views/productos/productolist/productolist.component';
import { ProductoformComponent } from 'src/app/views/productos/productoform/productoform.component';


@NgModule({
  declarations: [
    StartComponent,
    ProductosComponent,
    CategoriaComponent,
    CategoriaformComponent,
    CategorialistComponent,
    ProductolistComponent,
    ProductoformComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminlayoutRoutingModule),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CategoriaformComponent,
    ProductoformComponent
  ]
})
export class AdminlayoutModule { }
