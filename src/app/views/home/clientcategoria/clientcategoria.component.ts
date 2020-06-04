import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clientcategoria',
  templateUrl: './clientcategoria.component.html',
  styleUrls: ['./clientcategoria.component.scss']
})
export class ClientcategoriaComponent implements OnInit {
  categoria: Categoria[];
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private toast: ToastrService) { }
  API_URI_IMAGE = this.categoriaService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetCategoriasAll();
  }
  onGetCategoriasAll() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        if (res !== null) {
          this.categoria = res;
        } else {
          this.toast.info('info', 'No existe Categorias', {
            timeOut: 3000
          });
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
              timeOut: 3000
            });
          }
        }
      }
    );
  }
  onSelectedCategoria(id: string) {
    this.router.navigate(['/clientCateprodu', btoa(id)]);
  }

}
