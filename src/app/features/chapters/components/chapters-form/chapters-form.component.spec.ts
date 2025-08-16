import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersFormComponent } from './chapters-form.component';

describe('ChaptersFormComponent', () => {
  let component: ChaptersFormComponent;
  let fixture: ComponentFixture<ChaptersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaptersFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaptersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
