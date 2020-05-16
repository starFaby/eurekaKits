import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcategoriaComponent } from './reportcategoria.component';

describe('ReportcategoriaComponent', () => {
  let component: ReportcategoriaComponent;
  let fixture: ComponentFixture<ReportcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
