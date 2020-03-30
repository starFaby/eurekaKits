import { Directive, Renderer2, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appBackto]'
})
export class BacktoDirective implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }
  ngAfterViewInit() {
    this.onAddAtributes();
  }
  onAddAtributes() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
    this.renderer.setStyle(this.el.nativeElement, 'width', '60px');
    this.renderer.setStyle(this.el.nativeElement, 'height', '60px');
    this.renderer.setStyle(this.el.nativeElement, 'bottom', '20px');
    this.renderer.setStyle(this.el.nativeElement, 'right', '20px');
    this.renderer.setStyle(this.el.nativeElement, 'background', '#00b7f8');
    this.renderer.setStyle(this.el.nativeElement, 'border-bottom', '5px solid #0045a6');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '12px');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '6px 6px 6px #999');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '28px');
    this.renderer.setStyle(this.el.nativeElement, 'margin', '80px auto');
   // this.renderer.setStyle(this.el.nativeElement, 'padding', '20px');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease 0s');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease 0s');
  }

}
