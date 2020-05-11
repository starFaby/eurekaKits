import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientfacturaComponent } from './clientfactura.component';

describe('ClientfacturaComponent', () => {
  let component: ClientfacturaComponent;
  let fixture: ComponentFixture<ClientfacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientfacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
