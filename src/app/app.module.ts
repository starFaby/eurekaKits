import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminlayoutComponent,
    NavbarComponent,
    SidebarComponent,
    BacktoDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CategoriaService, CateproduService, AuthService,
    DetaventaService, DireccionService, PersonaService,
    ProductoService, TelefonoService, AuthGuard,
    ConsultasService, FormapagoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeninterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

