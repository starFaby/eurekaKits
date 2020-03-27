import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaformComponent } from './categoriaform.component';

describe('CategoriaformComponent', () => {
  let component: CategoriaformComponent;
  let fixture: ComponentFixture<CategoriaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
