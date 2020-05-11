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
import { PromocionComponent } from 'src/app/views/admin/promocion/promocion.component';
import { PromoformComponent } from 'src/app/views/admin/promocion/promoform/promoform.component';
import { PromolistComponent } from 'src/app/views/admin/promocion/promolist/promolist.component';
import { ClientformapagoComponent } from 'src/app/views/home/clientformapago/clientformapago.component';
import { ClientpromoComponent } from 'src/app/views/home/clientpromo/clientpromo.component';
import { ClientfacturasptbeComponent } from 'src/app/views/home/clientfacturasptbe/clientfacturasptbe.component';
import { ClientfacturaComponent } from 'src/app/views/home/clientfactura/clientfactura.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


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
    LoginComponent,
    PromocionComponent,
    PromoformComponent,
    PromolistComponent,
    ClientformapagoComponent,
    ClientpromoComponent,
    ClientfacturasptbeComponent,
    ClientfacturaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminlayoutRoutingModule),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  entryComponents: [
    CategoriaformComponent,
    ProductoformComponent,
    ClienteleformComponent,
    ClientdireccformComponent,
    PromoformComponent
  ]
})
export class AdminlayoutModule { }
