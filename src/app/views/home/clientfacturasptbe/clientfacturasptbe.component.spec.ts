import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientfacturasptbeComponent } from './clientfacturasptbe.component';

describe('ClientfacturasptbeComponent', () => {
  let component: ClientfacturasptbeComponent;
  let fixture: ComponentFixture<ClientfacturasptbeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientfacturasptbeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientfacturasptbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
