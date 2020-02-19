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
            nombre: ['', Validators.required],
            image: ['', Validators.required]
        });
    }
}
