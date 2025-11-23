import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadContainerComponent } from './files-upload-container.component';

describe('FilesUploadContainerComponent', () => {
  let component: FilesUploadContainerComponent;
  let fixture: ComponentFixture<FilesUploadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesUploadContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesUploadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
