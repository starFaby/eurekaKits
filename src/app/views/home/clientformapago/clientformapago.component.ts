import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Transbancformvali } from 'src/app/validators/transbancformvali';
import { Transbanc } from 'src/app/models/transbanc';
import { Formapagoformvali } from 'src/app/validators/formapagoformvali';
import { Formapago } from 'src/app/models/formapago';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/models/factura';
import { FormapagoService } from 'src/app/services/formapago.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Personafactura } from 'src/app/models/personafactura';
import { Tipopago } from 'src/app/models/tipopago';

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
  personaFactura: Personafactura[]; // para ver la persona con su factura
  tipoPago: Tipopago[];
  activeTab;
  constructor(
    private formapagoformvali: Formapagoformvali,
    private transbancformvali: Transbancformvali,
    private facturaService: FacturaService,
    private formapagoService: FormapagoService,
    private consultasService: ConsultasService
  ) {
    this.formFormPago = this.formapagoformvali.formFormPago;
    this.formTransBanc = this.transbancformvali.formTransBanc;
  }

  ngOnInit() {
    this.onGetPersonaFactura();
    this.onGetTipoPago();
    // const valorIndice = this.formFormPago.get('nombre').value;
    // console.log(valorIndice);
  }
  onValueChange(event) {
    this.activeTab = event.value - 1;
  }
  onGetPersonaFactura() { // cada persona con su factura
    const idpersona = localStorage.getItem('idpersona');
    this.consultasService.onGetpersonafactura(idpersona).subscribe(
      res => {
        this.personaFactura = res.map(t => t);
      },
      err => {
        console.log(err);
      }
    );
  }
  onGetTipoPago() { // paypal transferencia bancaria efectivo
    this.consultasService.onGettipopago().subscribe(
      res => {
        this.tipoPago = res.map(t => t);
      },
      err => {
        console.log(err);
      }
    );
  }
  onSubmit1() {
    if (this.formFormPago.valid) {
      if (this.formFormPago.get('idformapago').value == null) {
        const newFormapago: Formapago = {
          idfactura: this.formFormPago.get('idfactura').value,
          idtipopago: this.formFormPago.get('idtipopago').value,
          estado: this.formFormPago.get('estado').value,
        };
        this.formapagoService.onSaveFormaPago(newFormapago).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        this.onGetClearFormaPAgo();
      }
    }
  }
  onSubmit2() {
    if (this.formTransBanc.valid) {
      if (this.formTransBanc.get('idformapago').value == null) {
        /*  const newTransbanc: Transbanc = {
            idfactura: this.formTransBanc.get('idfactura').value,
            image: this.file,
            estado: this.formTransBanc.get('estado').value,
          };
          console.log(newTransbanc);*/
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
  onGetClearFormaPAgo() {
    this.formapagoformvali.oninitializeFomrGroup();
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
