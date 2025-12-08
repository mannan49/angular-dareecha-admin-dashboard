import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqsOcrComponent } from './mcqs-ocr.component';

describe('McqsOcrComponent', () => {
  let component: McqsOcrComponent;
  let fixture: ComponentFixture<McqsOcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McqsOcrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqsOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
