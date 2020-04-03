import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteleformComponent } from './clienteleform.component';

describe('ClienteleformComponent', () => {
  let component: ClienteleformComponent;
  let fixture: ComponentFixture<ClienteleformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteleformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
