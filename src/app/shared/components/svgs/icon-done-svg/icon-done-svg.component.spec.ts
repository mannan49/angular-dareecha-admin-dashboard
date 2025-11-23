import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDoneSvgComponent } from './icon-done-svg.component';

describe('IconDoneSvgComponent', () => {
  let component: IconDoneSvgComponent;
  let fixture: ComponentFixture<IconDoneSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDoneSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDoneSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
