import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categoriaformvali } from 'src/app/validators/categoriaformvali';

@Component({
  selector: 'app-categoriaform',
  templateUrl: './categoriaform.component.html',
  styleUrls: ['./categoriaform.component.scss']
})
export class CategoriaformComponent implements OnInit {
  formCategoria: FormGroup;
  constructor(private categoriaformvali: Categoriaformvali) {
    this.formCategoria = categoriaformvali.formCategoria;
   }

  ngOnInit() {
  }

}
