import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AdminlayoutRoutingModule } from './adminlayout-routing.module';
import { StartComponent } from 'src/app/views/start/start.component';
import { MaterialModule } from 'src/app/imports/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from 'src/app/views/admin/productos/productos.component';
import { CategoriaComponent } from 'src/app/views/admin/categoria/categoria.component';
import { CategoriaformComponent } from 'src/app/views/admin/categoria/categoriaform/categoriaform.component';
import { CategorialistComponent } from 'src/app/views/admin/categoria/categorialist/categorialist.component';
import { ProductolistComponent } from 'src/app/views/admin/productos/productolist/productolist.component';
import { ProductoformComponent } from 'src/app/views/admin/productos/productoform/productoform.component';
import { ClientcategoriaComponent } from 'src/app/views/home/clientcategoria/clientcategoria.component';
import { ClientcateproduComponent } from 'src/app/views/home/clientcateprodu/clientcateprodu.component';
import { ClientprodComponent } from 'src/app/views/home/clientprod/clientprod.component';
import { NoproductComponent } from 'src/app/views/noproduct/noproduct.component';
import { CanastaComponent } from 'src/app/views/home/canasta/canasta.component';
import { ClientpersonformComponent } from 'src/app/views/home/clientpersonform/clientpersonform.component';
import { ClienteleformComponent } from 'src/app/views/home/clienteleform/clienteleform.component';
import { ClientdireccformComponent } from 'src/app/views/home/clientdireccform/clientdireccform.component';
import { LoginComponent } from 'src/app/views/login/login.component';


@NgModule({
  declarations: [
    StartComponent,
    ProductosComponent,
    CategoriaComponent,
    CategoriaformComponent,
    CategorialistComponent,
    ProductolistComponent,
    ProductoformComponent,
    ClientcategoriaComponent,
    ClientcateproduComponent,
    ClientprodComponent,
    NoproductComponent,
    CanastaComponent,
    ClientpersonformComponent,
    ClienteleformComponent,
    ClientdireccformComponent,
    LoginComponent
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
    ProductoformComponent,
    ClienteleformComponent,
    ClientdireccformComponent
  ]
})
export class AdminlayoutModule { }
