import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientformapagoComponent } from './clientformapago.component';

describe('ClientformapagoComponent', () => {
  let component: ClientformapagoComponent;
  let fixture: ComponentFixture<ClientformapagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientformapagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientformapagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
