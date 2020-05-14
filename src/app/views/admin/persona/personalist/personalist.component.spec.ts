import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalistComponent } from './personalist.component';

describe('PersonalistComponent', () => {
  let component: PersonalistComponent;
  let fixture: ComponentFixture<PersonalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
