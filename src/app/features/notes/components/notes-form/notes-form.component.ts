import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { take, tap, catchError, EMPTY, finalize, filter } from 'rxjs';

import { Note } from '@models/entities/note.model';
import { Select } from '@models/shared/select.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { ActionResponse } from '@models/response/action-response.model';

import { GradesList } from '@constants/grades-list.constant';
import { BoardsList } from '@constants/boards-list.constants';
import { SubjectsList } from '@constants/subjects-list.constants';
import { ResourceTypesList } from '@constants/resource-types-list.constant';
import { ToasterMessageConstants } from '@constants/toaster-message.constant';

import { HotToastService } from '@ngxpert/hot-toast';
import { ApiHttpService } from '@shared/services/api-http.service';
import { Chapter } from '@models/entities/chapter.model';

@Component({
  selector: 'app-notes-form',
  standalone: false,
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.css',
})
export class NotesFormComponent {
  loading = false;
  isEditMode = false;
  noteLoading = false;
  notesForm: FormGroup;
  existingNoteId = String.Empty;
  chaptersList: Select[] = [];
  boardsList: Select[] = BoardsList;
  gradesList: Select[] = GradesList;
  subjectsList: Select[] = SubjectsList;
  resourceTypesList: Select[] = ResourceTypesList;
  filePreview: string | ArrayBuffer | null = null;
  coverImagePreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService
  ) {
    this.existingNoteId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.existingNoteId;
  }

  ngOnInit() {
    this.intializeForm();
    if (this.isEditMode) {
      this.fetchLatestChaptersList();
      this.noteLoading = true;
      this.fetchNoteData();
    }
  }

  intializeForm() {
    this.notesForm = this.formBuilder.group({
      title: [String.Empty, Validators.required],
      description: [String.Empty],
      topic: [String.Empty],
      grade: [String.Empty, Validators.required],
      board: [String.Empty, Validators.required],
      subject: [String.Empty, Validators.required],
      chapter: [String.Empty, Validators.required],
      type: [String.Empty, Validators.required],
      coverImage: null,
      pdf: null,
    });
  }

  fetchNoteData() {
    const noteFilter = new EntityFilter();
    noteFilter.id = this.existingNoteId;
    this.apiHttpService
      .getNotesByFilter(noteFilter)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Note>) => {
          this.patchNoteForm(res?.items?.[0]);
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          this.noteLoading = false;
        })
      )
      .subscribe();
  }

  patchNoteForm(note: Note) {
    this.notesForm.patchValue({
      title: note?.title,
      description: note?.description,
      topic: note?.topic,
      grade: note?.grade,
      board: note?.board,
      subject: note?.subject,
      chapter: note?.chapter,
      type: note?.type,
    });
    this.filePreview = note?.file?.url;
    this.coverImagePreview = note?.coverImage?.url;
  }

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.notesForm.patchValue({ [type]: file });
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'coverImage') {
          this.coverImagePreview = reader.result;
        } else if (type === 'pdf') {
          this.filePreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeUploadedFile(type: string) {
    this.notesForm.patchValue({ [type]: null });
    if (type === 'coverImage') {
      this.coverImagePreview = null;
    } else if (type === 'pdf') {
      this.filePreview = null;
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onSubmitForm() {
    if (this.notesForm.invalid) {
      this.toast.warning(ToasterMessageConstants.INCOMPLETE_FORM);
    }
    const formValue = this.notesForm.value;
    const formData = this.convertToFormData(formValue);
    if (this.isEditMode) {
      this.editNote(formData);
    } else {
      this.addNote(formData);
    }
  }

  convertToFormData(formValue: any): FormData {
    console.log('Form Value', formValue);
    const formData = new FormData();
    formData.append('Title', formValue.title);
    formData.append('Description', formValue.description);
    formData.append('Grade', formValue.grade);
    formData.append('Subject', formValue.subject);
    formData.append('Topic', formValue.topic);
    formData.append('Chapter', formValue.chapter);
    formData.append('Type', formValue.type);
    formData.append('Board', formValue.board);
    if (formValue.coverImage) {
      formData.append('CoverImage', formValue.coverImage);
    }
    if (formValue.pdf) {
      formData.append('File', formValue.pdf);
    }
    return formData;
  }

  addNote(note: FormData) {
    this.loading = true;
    this.apiHttpService
      .addNote(note)
      .pipe(
        take(1),
        tap((res: ActionResponse) => {
          this.toast.success(res?.message);
          this.resetForm();
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.ERROR_ADDING_NOTE);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  editNote(note: FormData) {
    this.loading = true;
    this.apiHttpService
      .updateNote(this.existingNoteId, note)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: ActionResponse) => {
          this.toast.success(res?.message);
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.ERROR_UPDATING_MCQ);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  handleSelectionChange(value: string) {
    setTimeout(() => {
      this.fetchLatestChaptersList();
    });
  }

  fetchLatestChaptersList() {
    const chaptersFilter = this.constructChaptersFilter();
    this.apiHttpService
      .getChaptersByFilter(chaptersFilter)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Chapter>) => {
          this.chaptersList = res?.items?.map(chapter => {
            return {
              Display: chapter?.name,
              Value: chapter?.id,
            };
          });
        })
      )
      .subscribe();
  }

  constructChaptersFilter(): EntityFilter {
    const formValue = this.notesForm.value;
    const chaptersFilter = new EntityFilter();
    chaptersFilter.grade = formValue.grade;
    chaptersFilter.subject = formValue.subject;
    if (formValue.board) {
      chaptersFilter.boards = [formValue.board];
    }
    return chaptersFilter;
  }

  resetForm() {
    this.notesForm.reset({
      title: String.Empty,
      description: String.Empty,
      topic: String.Empty,
      grade: String.Empty,
      board: String.Empty,
      subject: String.Empty,
      chapter: String.Empty,
      type: String.Empty,
      coverImage: null,
      pdf: null,
    });
    this.filePreview = null;
    this.coverImagePreview = null;
  }
}
