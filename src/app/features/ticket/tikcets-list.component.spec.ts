import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TikcetsListComponent } from './tikcets-list.component';

describe('TikcetsListComponent', () => {
  let component: TikcetsListComponent;
  let fixture: ComponentFixture<TikcetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TikcetsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TikcetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
