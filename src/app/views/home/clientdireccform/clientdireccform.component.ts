import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-clientdireccform',
  templateUrl: './clientdireccform.component.html',
  styleUrls: ['./clientdireccform.component.scss']
})
export class ClientdireccformComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<ClientdireccformComponent>) { }

  ngOnInit() {
  }
  onCloseDialog() {
    // this.categoriaformvali.formCategoria.reset();
    // this.categoriaformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }
  onSubmit() {
  }
}
