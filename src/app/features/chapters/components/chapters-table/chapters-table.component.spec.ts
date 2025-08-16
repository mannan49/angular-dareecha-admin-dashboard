import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersTableComponent } from './chapters-table.component';

describe('ChaptersTableComponent', () => {
  let component: ChaptersTableComponent;
  let fixture: ComponentFixture<ChaptersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaptersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaptersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
