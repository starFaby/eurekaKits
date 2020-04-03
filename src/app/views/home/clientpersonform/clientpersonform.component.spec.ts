import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpersonformComponent } from './clientpersonform.component';

describe('ClientpersonformComponent', () => {
  let component: ClientpersonformComponent;
  let fixture: ComponentFixture<ClientpersonformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientpersonformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpersonformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
