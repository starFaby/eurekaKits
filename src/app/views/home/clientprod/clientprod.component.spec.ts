import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientprodComponent } from './clientprod.component';

describe('ClientprodComponent', () => {
  let component: ClientprodComponent;
  let fixture: ComponentFixture<ClientprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
