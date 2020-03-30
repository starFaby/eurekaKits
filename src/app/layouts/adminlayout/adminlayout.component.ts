import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss']
})
export class AdminlayoutComponent implements OnInit   {
  opened: true;
  panelOpenState = false;
  constructor(private location: Location) {

  }
  ngOnInit() {

  }
  backto() {
    this.location.back();
  }
}
