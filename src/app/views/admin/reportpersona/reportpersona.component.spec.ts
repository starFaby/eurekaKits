import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpersonaComponent } from './reportpersona.component';

describe('ReportpersonaComponent', () => {
  let component: ReportpersonaComponent;
  let fixture: ComponentFixture<ReportpersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportpersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
