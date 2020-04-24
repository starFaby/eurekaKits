import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpromoComponent } from './clientpromo.component';

describe('ClientpromoComponent', () => {
  let component: ClientpromoComponent;
  let fixture: ComponentFixture<ClientpromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientpromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
