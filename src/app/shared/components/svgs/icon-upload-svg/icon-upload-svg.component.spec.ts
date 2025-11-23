import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUploadSvgComponent } from './icon-upload-svg.component';

describe('IconUploadSvgComponent', () => {
  let component: IconUploadSvgComponent;
  let fixture: ComponentFixture<IconUploadSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconUploadSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconUploadSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
