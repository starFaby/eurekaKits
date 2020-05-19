import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtolistComponent } from './dtolist.component';

describe('DtolistComponent', () => {
  let component: DtolistComponent;
  let fixture: ComponentFixture<DtolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
