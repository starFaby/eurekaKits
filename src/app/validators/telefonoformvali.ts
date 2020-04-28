import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Telefonoformvali {
    formTelefono: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorProducto();
    }
    onValidatorProducto() {
        this.formTelefono = this.formBuilder.group({
            idtelefono: [null],
            domisoci: ['', Validators.required],
            convencional: ['', Validators.required],
            celular1: ['', Validators.required],
            celular2: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }
    oninitializeFomrGroup() {
        this.formTelefono.setValue({
            idtelefono: null,
            domisoci: '',
            convencional: '',
            celular1: '',
            celular2: '',
            estado: ''
        });
    }
}
