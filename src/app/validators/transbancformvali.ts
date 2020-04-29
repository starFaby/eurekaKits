import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Transbancformvali {
    formTransBanc: FormGroup;
    constructor(private formBuilder: FormBuilder) { 
        this.onValidatorTransBanc();
    }
    onValidatorTransBanc() {
        this.formTransBanc = this.formBuilder.group({
            idformapago: [null],
            idfactura: ['', Validators.required],
            image: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }
    oninitializeFomrGroup() {
        this.formTransBanc.setValue({
            idformapago: null,
            idfactura: '',
            nombre: '',
            estado: ''
        });
    }
}
