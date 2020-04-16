import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss']
})
export class AdminlayoutComponent implements OnInit {
  opened: true;
  panelOpenState = false;
  constructor(private location: Location, private dialog: MatDialog) {

  }
  ngOnInit() {

  }
  backto() {
    this.location.back();
  }
}
