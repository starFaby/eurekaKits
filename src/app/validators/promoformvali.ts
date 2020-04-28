import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})
export class Promoformvali {
    formPromo: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorPromo();
    }
    onValidatorPromo() {
        this.formPromo = this.formBuilder.group({
            idpromociones: [null],
            idproducto: ['', Validators.required],
            dto: ['', Validators.required],
            fechainicio: ['', Validators.required],
            fechafin: ['', Validators.required],
            descripcion: ['', Validators.required],
            estado: ['', Validators.required],
        });
    }
    oninitializeFomrGroup() {
        this.formPromo.setValue({
            idpromociones: null,
            idproducto: '',
            dto: '',
            fechainicio: '',
            fechafin: '',
            descripcion: '',
            estado: ''
        });
    }
}
