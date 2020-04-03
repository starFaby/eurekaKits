import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ClienteleformComponent } from '../clienteleform/clienteleform.component';
import { ClientdireccformComponent } from '../clientdireccform/clientdireccform.component';
import { FormGroup } from '@angular/forms';
import { Personaformvali } from 'src/app/validators/personaformvali';

@Component({
  selector: 'app-clientpersonform',
  templateUrl: './clientpersonform.component.html',
  styleUrls: ['./clientpersonform.component.scss']
})
export class ClientpersonformComponent implements OnInit {
  formPersona: FormGroup;
  constructor(private dialog: MatDialog, private personaformvali: Personaformvali) {
    this.formPersona = this.personaformvali.formPersona;
  }
  ngOnInit() {
  }
  onOpenFormTelef() {
  //  this.productoformvali.oninitializeFomrGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ClienteleformComponent, dialogConfig);
  }
  onOpenFormDirecc() {
    //  this.productoformvali.oninitializeFomrGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(ClientdireccformComponent, dialogConfig);
    }
    onSubmit() {
      console.log(this.formPersona.value);
    }

}
