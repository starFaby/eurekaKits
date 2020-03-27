import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientcategoriaComponent } from './clientcategoria.component';

describe('ClientcategoriaComponent', () => {
  let component: ClientcategoriaComponent;
  let fixture: ComponentFixture<ClientcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
