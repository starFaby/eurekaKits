import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientcategoria',
  templateUrl: './clientcategoria.component.html',
  styleUrls: ['./clientcategoria.component.scss']
})
export class ClientcategoriaComponent implements OnInit {
  arreglo;
  constructor(private categoriaService: CategoriaService, private router: Router) { }
  API_URI_IMAGE = this.categoriaService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetCategoriasAll();
  }
  onGetCategoriasAll() {
    this.categoriaService.onGetCategorias().subscribe(
      res => {
        this.arreglo = res;
        console.log(this.arreglo);
      },
      err => console.log(err)
    );
  }

  onSelectedCategoria(id: string) {
    this.router.navigate(['/clientCateprodu', id]);
  }

}
