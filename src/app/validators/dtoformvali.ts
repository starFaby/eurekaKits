import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class Dtoformvali {
    formDto: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.onValidatorTransBanc();
    }
    onValidatorTransBanc() {
        this.formDto = this.formBuilder.group({
            iddto: [null],
            dto: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }
    oninitializeFomrGroup() {
        this.formDto.setValue({
            iddto: null,
            dto: '',
            estado: ''
        });
    }
}
