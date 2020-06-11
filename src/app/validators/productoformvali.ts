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
            idproducto: [null],
            idcategoria: ['', Validators.required],
            nombre: ['', Validators.required],
            describir: ['', Validators.required],
            image: ['', Validators.required],
            precio: [0, Validators.required],
            stock: [0, Validators.required],
            estado: [0, Validators.required],
        });
    }
    oninitializeFomrGroup() {
        this.formProducto.setValue({
            idproducto: null,
            idcategoria: '',
            nombre: '',
            describir: '',
            image: '',
            precio: 0,
            stock: 0,
            estado: 0
        });
    }
}
