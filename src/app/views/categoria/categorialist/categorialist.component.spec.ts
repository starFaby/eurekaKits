import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorialistComponent } from './categorialist.component';

describe('CategorialistComponent', () => {
  let component: CategorialistComponent;
  let fixture: ComponentFixture<CategorialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
