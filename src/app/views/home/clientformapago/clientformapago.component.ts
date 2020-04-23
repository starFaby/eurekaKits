import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Transbancformvali } from 'src/app/validators/transbancformvali';
import { Transbanc } from 'src/app/models/transbanc';
import { Formapagoformvali } from 'src/app/validators/formapagoformvali';
import { Formapago } from 'src/app/models/formapago';

@Component({
  selector: 'app-clientformapago',
  templateUrl: './clientformapago.component.html',
  styleUrls: ['./clientformapago.component.scss']
})
export class ClientformapagoComponent implements OnInit {
  file: File;
  formFormPago: FormGroup;
  formTransBanc: FormGroup;
  photoSelected: string | ArrayBuffer;
  arrayFormaPago = [
    { id: 1, nombre: 'Paypal' },
    { id: 2, nombre: 'Transferencia Bancaria' },
    { id: 3, nombre: 'Efectivo' }
  ];
  constructor(
    private formapagoformvali: Formapagoformvali,
    private transbancformvali: Transbancformvali
  ) {
    this.formFormPago = this.formapagoformvali.formFormPago;
    this.formTransBanc = this.transbancformvali.formTransBanc;
  }

  ngOnInit() {
  }
  onSubmit1() {
    if (this.formFormPago.valid) {
      if (this.formFormPago.get('idformapago').value == null) {
        const newFormapago: Formapago = {
          idfactura: this.formFormPago.get('idfactura').value,
          nombre: this.formFormPago.get('nombre').value,
          estado: this.formFormPago.get('estado').value,
        };
        console.log(newFormapago);
      }
    }
  }
  onSubmit2() {
    if (this.formTransBanc.valid) {
      if (this.formTransBanc.get('idformapago').value == null) {
        const newTransbanc: Transbanc = {
          idfactura: this.formTransBanc.get('idfactura').value,
          image: this.file,
          estado: this.formTransBanc.get('estado').value,
        };
        console.log(newTransbanc);
      }
    }
  }
  onSubmit3() {
    /*  if (this.formTransBanc.valid) {
        if (this.formTransBanc.get('idformapago').value == null) {
          const newTransbanc: Transbanc = {
            idfactura: this.formTransBanc.get('idfactura').value,
            image: this.file,
            estado: this.formTransBanc.get('estado').value,
          };
        }
      }*/
  }
  onSubmit4() {
    /*  if (this.formTransBanc.valid) {
        if (this.formTransBanc.get('idformapago').value == null) {
          const newTransbanc: Transbanc = {
            idfactura: this.formTransBanc.get('idfactura').value,
            image: this.file,
            estado: this.formTransBanc.get('estado').value,
          };
        }
      }*/
  }
  onGetClearTB() {
  }
  onPhotoSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
}
