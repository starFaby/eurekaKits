import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoproductComponent } from './noproduct.component';

describe('NoproductComponent', () => {
  let component: NoproductComponent;
  let fixture: ComponentFixture<NoproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
