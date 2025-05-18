import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TikcetCardComponent } from './tikcet-card.component';

describe('TikcetCardComponent', () => {
  let component: TikcetCardComponent;
  let fixture: ComponentFixture<TikcetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TikcetCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TikcetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
