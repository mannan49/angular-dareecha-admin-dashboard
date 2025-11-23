import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { take, tap, catchError, EMPTY, finalize, filter } from 'rxjs';

import { Note } from '@models/entities/note.model';
import { Select } from '@models/shared/select.model';
import { Chapter } from '@models/entities/chapter.model';
import { Attachment } from '@models/shared/attachment.model';
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

@Component({
  selector: 'app-notes-form',
  standalone: false,
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.css',
})
export class NotesFormComponent {
  note = new Note();
  loading = false;
  isEditMode = false;
  noteLoading = false;
  notesForm: FormGroup;
  resetMediaState = false;
  filePreview = String.Empty;
  chaptersList: Select[] = [];
  existingNoteId = String.Empty;
  coverImagePreview = String.Empty;
  boardsList: Select[] = BoardsList;
  gradesList: Select[] = GradesList;
  subjectsList: Select[] = SubjectsList;
  cloudFrontUrl = environment.cloudFrontUrl;
  resourceTypesList: Select[] = ResourceTypesList;

  constructor(private route: ActivatedRoute, private toast: HotToastService, private formBuilder: FormBuilder, private apiHttpService: ApiHttpService) {
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
      chapter: [String.Empty],
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
          this.note = res?.items?.[0];
          this.patchNoteForm();
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

  patchNoteForm() {
    this.notesForm.patchValue({
      title: this.note?.title,
      description: this.note?.description,
      topic: this.note?.topic,
      grade: this.note?.grade,
      board: this.note?.board,
      subject: this.note?.subject,
      chapter: this.note?.chapter,
      type: this.note?.type,
    });
    this.filePreview = this.cloudFrontUrl + this.note?.file?.url;
    this.coverImagePreview = this.cloudFrontUrl + this.note?.coverImage?.url;
  }

  onSubmitForm() {
    if (this.notesForm.invalid) {
      this.toast.warning(ToasterMessageConstants.INCOMPLETE_FORM);
    }
    const formValue = this.notesForm.getRawValue();
    this.setFormData(formValue);
    if (this.isEditMode) {
      this.editNote();
    } else {
      this.addNote();
    }
  }

  handleImageUpload(coverImage: Attachment) {
    this.note.coverImage = coverImage;
  }

  handleFileUpload(file: Attachment) {
    this.note.file = file;
  }

  setFormData(formValue: any) {
    console.log('Form Value', formValue);
    this.note.title = formValue.title;
    this.note.description = formValue.description;
    this.note.grade = formValue.grade;
    this.note.subject = formValue.subject;
    this.note.topic = formValue.topic;
    this.note.chapter = formValue.chapter;
    this.note.type = formValue.type;
    this.note.board = formValue.board;
  }

  addNote() {
    this.loading = true;
    this.apiHttpService
      .addNote(this.note)
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

  editNote() {
    this.loading = true;
    this.apiHttpService
      .updateNote(this.existingNoteId, this.note)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: ActionResponse) => {
          this.toast.success(res?.message);
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.ERROR_DELETING_NOTE);
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
    this.resetMediaState = true;
  }
}
