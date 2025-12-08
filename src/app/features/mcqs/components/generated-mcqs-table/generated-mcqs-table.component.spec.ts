import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedMcqsTableComponent } from './generated-mcqs-table.component';

describe('GeneratedMcqsTableComponent', () => {
  let component: GeneratedMcqsTableComponent;
  let fixture: ComponentFixture<GeneratedMcqsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratedMcqsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedMcqsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
