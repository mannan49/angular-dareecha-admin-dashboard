import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqsContainerComponent } from './mcqs-container.component';

describe('McqsContainerComponent', () => {
  let component: McqsContainerComponent;
  let fixture: ComponentFixture<McqsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McqsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
