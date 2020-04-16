import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
  providers: [CategoriaService, CateproduService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
