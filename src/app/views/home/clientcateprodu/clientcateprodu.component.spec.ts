import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientcateproduComponent } from './clientcateprodu.component';

describe('ClientcateproduComponent', () => {
  let component: ClientcateproduComponent;
  let fixture: ComponentFixture<ClientcateproduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientcateproduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientcateproduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
