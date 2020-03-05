import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Productoformvali {
    formProducto: FormGroup;
    constructor(private formBuilder: FormBuilder){
        this.onValidatorProducto();
    }
    onValidatorProducto(){
        this.formProducto = this.formBuilder.group({
            idProducto: [null],
            idCategoria: ['', Validators.required],
            nombre: ['', Validators.required],
            image: ['', Validators.required],
            precio: ['', Validators.required],
            stock: ['', Validators.required],
            estado: ['', Validators.required],
        });
    }
    oninitializeFomrGroup() {
        this.formProducto.setValue({
            idProducto: null,
            idCategoria: '',
            nombre: '',
            image: '',
            precio: '',
            stock: '',
            estado: ''
        });
    }
}
