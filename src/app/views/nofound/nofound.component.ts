import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nofound',
  templateUrl: './nofound.component.html',
  styleUrls: ['./nofound.component.scss']
})
export class NofoundComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  backto() {
    this.location.back();
  }
}
