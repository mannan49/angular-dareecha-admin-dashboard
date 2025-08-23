import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChapterMcqsComponent } from './single-chapter-mcqs.component';

describe('SingleChapterMcqsComponent', () => {
  let component: SingleChapterMcqsComponent;
  let fixture: ComponentFixture<SingleChapterMcqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleChapterMcqsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleChapterMcqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
