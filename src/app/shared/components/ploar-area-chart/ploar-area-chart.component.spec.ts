import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloarAreaChartComponent } from './ploar-area-chart.component';

describe('PloarAreaChartComponent', () => {
  let component: PloarAreaChartComponent;
  let fixture: ComponentFixture<PloarAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PloarAreaChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PloarAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
