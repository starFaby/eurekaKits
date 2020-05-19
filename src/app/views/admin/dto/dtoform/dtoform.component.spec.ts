import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtoformComponent } from './dtoform.component';

describe('DtoformComponent', () => {
  let component: DtoformComponent;
  let fixture: ComponentFixture<DtoformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtoformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
