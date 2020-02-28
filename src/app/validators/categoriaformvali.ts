import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Categoriaformvali {

    formCategoria: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorCliente();
    }
    onValidatorCliente() {
        this.formCategoria = this.formBuilder.group({
            idCategoria: [null],
            nombre: ['', Validators.required],
            image: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }
    oninitializeFomrGroup() {
        this.formCategoria.setValue({
            idCategoria: null,
            nombre: '',
            image: File,
            estado: ''
        });
    }
}
