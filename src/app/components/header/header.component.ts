import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('canva', { static: false }) canva: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  cWidth;
  cHeight;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.onGetCanvasInit();
  }
  onGetCanvasInit() {
    this.ctx = this.canva.nativeElement.getContext('2d');
    this.cWidth = this.canva.nativeElement.clientWidth;
    this.cHeight = this.canva.nativeElement.clientWidth;
    const image = new Image();
    const image1 = new Image();
    console.log('cWidth ', this.cWidth, ' cHeigth ', this.cHeight);
    this.ctx.save();
    const gradient = this.ctx.createLinearGradient(10, 90, 300, 90);
    gradient.addColorStop(0, '#6495ed');
    gradient.addColorStop(1, '#fff');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.cWidth, this.cHeight);
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(0, 0, this.cWidth, this.cHeight);
    this.ctx.restore();
    image.onload = () => {
      this.ctx.drawImage(image, 10, 20, 50, 50);
    };
    image.src = '../../../assets/img/tdtd.png';
    image1.onload = () => {
      this.ctx.drawImage(image1, 230, 90, 50, 50);
    };
    image1.src = '../../../assets/img/euk.png';
  }


}
