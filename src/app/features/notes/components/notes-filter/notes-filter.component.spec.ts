import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesFilterComponent } from './notes-filter.component';

describe('NotesFilterComponent', () => {
  let component: NotesFilterComponent;
  let fixture: ComponentFixture<NotesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
