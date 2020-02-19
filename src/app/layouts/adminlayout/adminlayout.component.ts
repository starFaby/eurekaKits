import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss']
})
export class AdminlayoutComponent implements OnInit {
  opened: true;
  panelOpenState = false;
  constructor() {

  }
  ngOnInit() {

  }
}
