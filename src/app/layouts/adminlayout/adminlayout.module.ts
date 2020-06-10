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
import { PersonaComponent } from 'src/app/views/admin/persona/persona.component';
import { PersonaformComponent } from 'src/app/views/admin/persona/personaform/personaform.component';
import { PersonalistComponent } from 'src/app/views/admin/persona/personalist/personalist.component';
import { NofoundComponent } from 'src/app/views/nofound/nofound.component';
import { ReportpersonaComponent } from 'src/app/views/admin/reportpersona/reportpersona.component';
import { ReportcategoriaComponent } from 'src/app/views/admin/reportcategoria/reportcategoria.component';
import { ReportproductosComponent } from 'src/app/views/admin/reportproductos/reportproductos.component';
import { ReportpromocionComponent } from 'src/app/views/admin/reportpromocion/reportpromocion.component';
import { DtoformComponent } from 'src/app/views/admin/dto/dtoform/dtoform.component';
import { DtoComponent } from 'src/app/views/admin/dto/dto.component';
import { DtolistComponent } from 'src/app/views/admin/dto/dtolist/dtolist.component';
import { ToastrModule } from 'ngx-toastr';

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
    ClientfacturaComponent,
    PersonaComponent,
    PersonaformComponent,
    PersonalistComponent,
    NofoundComponent,
    ReportpersonaComponent,
    ReportcategoriaComponent,
    ReportproductosComponent,
    ReportpromocionComponent,
    DtoformComponent,
    DtoComponent,
    DtolistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminlayoutRoutingModule),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    ToastrModule.forRoot({
      timeOut: 500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  entryComponents: [
    CategoriaformComponent,
    ProductoformComponent,
    ClienteleformComponent,
    ClientdireccformComponent,
    PromoformComponent,
    PersonaformComponent,
    DtoformComponent
  ]
})
export class AdminlayoutModule { }
