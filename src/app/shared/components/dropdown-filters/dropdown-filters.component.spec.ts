import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFiltersComponent } from './dropdown-filters.component';

describe('DropdownFiltersComponent', () => {
  let component: DropdownFiltersComponent;
  let fixture: ComponentFixture<DropdownFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
