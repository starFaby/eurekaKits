import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-clientcategoria',
  templateUrl: './clientcategoria.component.html',
  styleUrls: ['./clientcategoria.component.scss']
})
export class ClientcategoriaComponent implements OnInit {
  categoria: Categoria[];
  constructor(private categoriaService: CategoriaService, private router: Router) { }
  API_URI_IMAGE = this.categoriaService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetCategoriasAll();
  }
  onGetCategoriasAll() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        this.categoria = res;
        console.log(this.categoria);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            console.log('No existe Categorias');
          }
        }
      }
    );
  }

  onSelectedCategoria(id: string) {
    this.router.navigate(['/clientCateprodu', btoa(id)]);
  }

}
