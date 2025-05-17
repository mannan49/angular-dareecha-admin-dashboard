import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPreviewCardComponent } from './bus-preview-card.component';

describe('BusPreviewCardComponent', () => {
  let component: BusPreviewCardComponent;
  let fixture: ComponentFixture<BusPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPreviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
