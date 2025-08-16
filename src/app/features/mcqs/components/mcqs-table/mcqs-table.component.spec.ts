import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqsTableComponent } from './mcqs-table.component';

describe('McqsTableComponent', () => {
  let component: McqsTableComponent;
  let fixture: ComponentFixture<McqsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McqsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
