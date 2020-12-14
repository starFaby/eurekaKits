import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactadminComponent } from './factadmin.component';

describe('FactadminComponent', () => {
  let component: FactadminComponent;
  let fixture: ComponentFixture<FactadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
