import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportproductosComponent } from './reportproductos.component';

describe('ReportproductosComponent', () => {
  let component: ReportproductosComponent;
  let fixture: ComponentFixture<ReportproductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportproductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
