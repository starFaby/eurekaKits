import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('canva', { static: false }) canva: ElementRef<HTMLCanvasElement>;
  @ViewChild('colorf', { static: false }) colorf: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  cWidth;
  cHeight;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.onGetColor();
  }
  onGetColor() {
    this.renderer.setStyle(this.colorf.nativeElement, 'background', '#33FF55');
    this.renderer.setStyle(this.colorf.nativeElement, 'margin', '3px');
   // this.renderer.setStyle(this.colorf.nativeElement, 'border', '3px solid #6495ed');
   // this.renderer.setStyle(this.colorf.nativeElement, 'width', '100%');
   // this.renderer.setStyle(this.colorf.nativeElement, 'height', '45%');
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
    this.ctx.font = 'bold 150%  comic sans';
    this.ctx.fillStyle = '#000';
    this.ctx.fillText('Eureka kits', 170, 130);
  }


}
