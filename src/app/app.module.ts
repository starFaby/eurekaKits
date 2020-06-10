import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './imports/material.module';
import { AdminlayoutComponent } from './layouts/adminlayout/adminlayout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from './services/categoria.service';
import { CateproduService } from './services/cateprodu.service';
import { BacktoDirective } from './directive/backto.directive';
import { AuthService } from './services/auth.service';
import { DetaventaService } from './services/detaventa.service';
import { TokeninterceptorService } from './interceptor/tokeninterceptor.service';
import { DireccionService } from './services/direccion.service';
import { PersonaService } from './services/persona.service';
import { ProductoService } from './services/producto.service';
import { TelefonoService } from './services/telefono.service';
import { AuthGuard } from './guard/auth.guard';
import { ConsultasService } from './services/consultas.service';
import { FormapagoService } from './services/formapago.service';
import { AdminGuard } from './guard/admin.guard';
import { DtoService } from './services/dto.service';
import { EfectService } from './services/efect.service';
import { FacturaService } from './services/factura.service';
import { PaypalService } from './services/paypal.service';
import { PaypalbuyService } from './services/paypalbuy.service';
import { PromocionService } from './services/promocion.service';
import { TransbancService } from './services/transbanc.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminlayoutComponent,
    NavbarComponent,
    SidebarComponent,
    BacktoDirective // directiva pra mostrar boton en todo el proyecto
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    ToastrModule.forRoot({
      timeOut: 500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  providers: [
    AuthService, CategoriaService, CateproduService, ConsultasService,
    DetaventaService, DireccionService, DtoService, EfectService,
    FacturaService, FormapagoService, PaypalService, PaypalbuyService,
    PersonaService, ProductoService, TelefonoService, TransbancService,
    AuthGuard, AdminGuard,
      PromocionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeninterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

