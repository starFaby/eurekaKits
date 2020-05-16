import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpromocionComponent } from './reportpromocion.component';

describe('ReportpromocionComponent', () => {
  let component: ReportpromocionComponent;
  let fixture: ComponentFixture<ReportpromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportpromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportpromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
