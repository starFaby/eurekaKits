import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Transbancformvali } from 'src/app/validators/transbancformvali';
import { Transbanc } from 'src/app/models/transbanc';

@Component({
  selector: 'app-clientformapago',
  templateUrl: './clientformapago.component.html',
  styleUrls: ['./clientformapago.component.scss']
})
export class ClientformapagoComponent implements OnInit {
  file: File;
  formTransBanc: FormGroup;
  photoSelected: string | ArrayBuffer;
  constructor(private transbancformvali: Transbancformvali) {
    this.formTransBanc = this.transbancformvali.formTransBanc;
  }

  ngOnInit() {
  }
  onSubmit2() {
    if (this.formTransBanc.valid) {
      if (this.formTransBanc.get('idformapago').value == null) {
        const newTransbanc: Transbanc = {
          idfactura: this.formTransBanc.get('idfactura').value,
          image: this.file,
          estado: this.formTransBanc.get('estado').value,
        };
      }
    }
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
