import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  foods: [
    {value: '1', viewValue: 'Herramientas'},
    {value: '2', viewValue: 'libros'},
    {value: '3', viewValue: 'repeustos'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
