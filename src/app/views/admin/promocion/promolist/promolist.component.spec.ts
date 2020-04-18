import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromolistComponent } from './promolist.component';

describe('PromolistComponent', () => {
  let component: PromolistComponent;
  let fixture: ComponentFixture<PromolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
