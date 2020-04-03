import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdireccformComponent } from './clientdireccform.component';

describe('ClientdireccformComponent', () => {
  let component: ClientdireccformComponent;
  let fixture: ComponentFixture<ClientdireccformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdireccformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdireccformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
