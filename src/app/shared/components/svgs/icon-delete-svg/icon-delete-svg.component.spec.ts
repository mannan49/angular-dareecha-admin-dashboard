import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDeleteSvgComponent } from './icon-delete-svg.component';

describe('IconDeleteSvgComponent', () => {
  let component: IconDeleteSvgComponent;
  let fixture: ComponentFixture<IconDeleteSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDeleteSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDeleteSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
