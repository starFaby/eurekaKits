import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss']
})
export class AdminlayoutComponent implements OnInit {
  opened: true;
  panelOpenState = false;
  constructor(private location: Location, public authService: AuthService) {

  }
  ngOnInit() {

  }
  backto() {
    this.location.back();
  }
}
