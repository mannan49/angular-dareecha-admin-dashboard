import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersContainerComponent } from './chapters-container.component';

describe('ChaptersContainerComponent', () => {
  let component: ChaptersContainerComponent;
  let fixture: ComponentFixture<ChaptersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaptersContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaptersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
