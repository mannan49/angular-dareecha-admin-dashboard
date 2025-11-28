import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { Select } from '@models/shared/select.model';
import { Chapter } from '@models/entities/chapter.model';
import { ActionResponse } from '@models/response/action-response.model';

import { GradesList } from '@constants/grades-list.constant';
import { BoardsList } from '@constants/boards-list.constants';
import { SubjectsList } from '@constants/subjects-list.constants';

import { HotToastService } from '@ngxpert/hot-toast';
import { ApiHttpService } from '@shared/services/api-http.service';
import { ToasterMessageConstants } from '@constants/toaster-message.constant';

@Component({
  selector: 'app-chapters-form',
  standalone: false,
  templateUrl: './chapters-form.component.html',
  styleUrl: './chapters-form.component.css',
})
export class ChaptersFormComponent {
  loading = false;
  isEditMode = false;
  chapterLoading = false;
  chapterForm: FormGroup;
  existingChapterId = String.Empty;
  filePreview: string | ArrayBuffer | null = null;

  boardsList: Select[] = BoardsList;
  gradesList: Select[] = GradesList;
  subjectsList: Select[] = SubjectsList;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService
  ) {
    this.existingChapterId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.existingChapterId;
  }

  ngOnInit() {
    this.initializeForm();
    if (this.isEditMode) {
      this.chapterLoading = true;
      this.fetchChapterData();
    }
  }

  initializeForm() {
    this.chapterForm = this.formBuilder.group({
      name: [String.Empty, Validators.required],
      board: [String.Empty, Validators.required],
      grade: [String.Empty, Validators.required],
      subject: [String.Empty, Validators.required],
      index: [0, Validators.required],
      media: null,
    });
  }

  fetchChapterData() {
    this.apiHttpService
      .getChapterById(this.existingChapterId)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: Chapter) => {
          this.patchChapterForm(res);
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          this.chapterLoading = false;
        })
      )
      .subscribe();
  }

  patchChapterForm(chapter: Chapter) {
    this.chapterForm.patchValue({
      name: chapter?.Name,
      board: chapter?.Board,
      grade: chapter?.Grade,
      subject: chapter?.Subject,
      index: chapter?.Index,
    });
    this.filePreview = chapter?.Media?.Url;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.chapterForm.patchValue({ media: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeUploadedFile() {
    this.chapterForm.patchValue({ media: null });
    this.filePreview = null;
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onSubmitForm() {
    if (this.chapterForm.invalid) return;
    const formValue = this.chapterForm.value;
    const formData = this.convertToFormData(formValue);
    if (this.isEditMode) {
      this.editChapter(formData);
    } else {
      this.addChapter(formData);
    }
  }

  convertToFormData(formValue: any): FormData {
    const formData = new FormData();
    formData.append('Name', formValue.name);
    formData.append('Grade', formValue.grade);
    formData.append('Subject', formValue.subject);
    formData.append('Board', formValue.board);
    formData.append('Index', formValue.index);
    if (formValue.media) {
      formData.append('Media', formValue.media);
    }
    return formData;
  }

  addChapter(chapter: FormData) {
    this.loading = true;
    this.apiHttpService
      .addChapter(chapter)
      .pipe(
        take(1),
        tap((res: ActionResponse) => {
          this.toast.success(res?.Message);
          this.resetForm();
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.ERROR_ADDING_CHAPTER);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  editChapter(chapter: FormData) {
    this.loading = true;
    this.apiHttpService
      .editChapter(this.existingChapterId, chapter)
      .pipe(
        take(1),
        tap((res: ActionResponse) => {
          this.toast.success(res?.Message);
          this.router.navigate(['chapters']);
          this.resetForm();
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.ERROR_UPDATING_CHAPTER);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  resetForm() {
    this.chapterForm.reset({
      name: String.Empty,
      board: String.Empty,
      grade: String.Empty,
      subject: String.Empty,
      index: 0,
      media: null,
    });
    this.filePreview = null;
  }
}
