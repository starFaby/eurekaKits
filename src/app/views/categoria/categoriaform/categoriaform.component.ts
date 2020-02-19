import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categoriaform',
  templateUrl: './categoriaform.component.html',
  styleUrls: ['./categoriaform.component.scss']
})
export class CategoriaformComponent implements OnInit {
  formCategoria: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
