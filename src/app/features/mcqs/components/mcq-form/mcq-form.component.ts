import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { Mcq } from '@models/entities/mcq.model';
import { Select } from '@models/shared/select.model';
import { Chapter } from '@models/entities/chapter.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { ScopedReference } from '@models/shared/scoped-reference.model';

import { GradesList } from '@constants/grades-list.constant';
import { BoardsList } from '@constants/boards-list.constants';
import { OptionsList } from '@constants/options-list.constants';
import { SubjectsList } from '@constants/subjects-list.constants';
import { ToasterMessageConstants } from '@constants/toaster-message.constant';
import { DifficultyLevelList } from '@constants/difficulty-level-list.constants';

import { HotToastService } from '@ngxpert/hot-toast';
import { ApiHttpService } from '@shared/services/api-http.service';
import { ActionResponse } from '@models/response/action-response.model';

@Component({
  selector: 'app-mcq-form',
  standalone: false,
  templateUrl: './mcq-form.component.html',
  styleUrl: './mcq-form.component.css',
})
export class McqFormComponent {
  mcq: Mcq;
  loading = false;
  mcqLoading = false;
  isEditMode = false;
  mcqForm: FormGroup;
  chapterList: Select[];
  existingMcqId = String.Empty;
  gradesList: Select[] = GradesList;
  optionsList: Select[] = OptionsList;
  subjectsList: Select[] = SubjectsList;
  boardsList: Select[] = BoardsList;
  difficultyLevelList: Select[] = DifficultyLevelList;
  mediaPreview: string | ArrayBuffer | null = null;
  attachmentsToRemove: string[] = [];
  filePreviews: { [key: string]: string | ArrayBuffer | null } = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService
  ) {
    this.existingMcqId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.existingMcqId;
  }

  ngOnInit() {
    this.initializeForm();
    if (this.isEditMode) {
      this.fetchLatestChaptersList();
      this.mcqLoading = false;
      this.fetchMcqData();
    }
  }

  initializeForm() {
    this.mcqForm = this.formBuilder.group({
      statement: [String.Empty, Validators.required],
      correctOption: [String.Empty, Validators.required],
      options: this.formBuilder.array([this.createOption('A'), this.createOption('B'), this.createOption('C'), this.createOption('D')]),
      grade: [String.Empty, Validators.required],
      subject: [String.Empty, Validators.required],
      chapters: [String.Empty, Validators.required],
      difficultyLevel: [String.Empty, Validators.required],
      boards: [String.Empty, Validators.required],
      media: [String.Empty],
      active: [true],
    });
  }

  fetchMcqData() {
    this.apiHttpService
      .getMcqById(this.existingMcqId)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: Mcq) => {
          this.mcq = res;
          this.patchMcqForm(res);
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          this.mcqLoading = false;
        })
      )
      .subscribe();
  }

  patchMcqForm(mcq: Mcq) {
    this.mcqForm.patchValue({
      statement: mcq?.Statement,
      correctOption: mcq?.CorrectOption?.RefId,
      options: mcq?.Options,
      grade: mcq?.Grade,
      subject: mcq?.Subject,
      chapters: mcq?.Chapters,
      difficultyLevel: mcq?.DifficultyLevel,
      boards: mcq?.Boards,
      media: mcq?.Attachments?.[0],
    });
    this.mediaPreview = mcq.Attachments?.[0]?.Url;
    mcq.Options?.forEach(opt => {
      if (opt?.Media?.Url) {
        this.filePreviews[opt?.McqId] = opt?.Media?.Url;
      }
    });
  }

  createOption(id: string): FormGroup {
    return this.formBuilder.group({
      id: [id],
      text: [''],
      media: [null],
    });
  }

  get optionsFormArray() {
    return this.mcqForm.get('options') as FormArray;
  }

  get optionFormGroups(): FormGroup[] {
    return this.optionsFormArray.controls as FormGroup[];
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event, option?: FormGroup) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (option?.value?.id) {
        option.patchValue({ media: file });
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreviews[option.value.id] = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.mcqForm.patchValue({ media: file });
        const reader = new FileReader();
        reader.onload = () => {
          this.mediaPreview = reader.result;
        };
        reader.readAsDataURL(file);
        this.attachmentsToRemove = [];
      }
    }
  }

  removeUploadedFile(option: FormGroup) {
    option.patchValue({ media: null });
    delete this.filePreviews[option.value.id];
  }

  removeUploadedMedia() {
    this.mcqForm.patchValue({ media: null });
    this.attachmentsToRemove = [this.mcq?.Attachments?.[0]?.PublicId];
    this.mediaPreview = null;
  }

  onSubmitForm() {
    if (this.mcqForm.invalid) {
      this.toast.warning(ToasterMessageConstants.INCOMPLETE_FORM);
    }
    const formValue = this.mcqForm.value;
    const formData = this.convertToFormData(formValue);
    if (this.isEditMode) {
      this.editMcq(formData);
    } else {
      this.addMcq(formData);
    }
  }

  convertToFormData(mcqValue: any): FormData {
    const formData = new FormData();

    formData.append('Statement', mcqValue.statement);
    formData.append('CorrectOptionId', mcqValue.correctOption);
    formData.append('Grade', mcqValue.grade);
    formData.append('Subject', mcqValue.subject);
    mcqValue.boards.forEach((board: string) => {
      formData.append('Boards', board);
    });
    mcqValue.chapters.forEach((chapter: ScopedReference, i: number) => {
      formData.append(`Chapters[${i}].RefId`, chapter?.RefId);
      formData.append(`Chapters[${i}].Text`, chapter?.Text);
      formData.append(`Chapters[${i}].System`, chapter?.System);
    });
    formData.append('DifficultyLevel', mcqValue.difficultyLevel);
    formData.append('Active', mcqValue.active);
    if (mcqValue.media) {
      formData.append('Attachments', mcqValue.media);
    }
    this.attachmentsToRemove.forEach(id => {
      formData.append('AttachmentsToRemove', id);
    });

    mcqValue.options.forEach((option: any, index: number) => {
      formData.append(`Options[${index}].Id`, option.id);
      formData.append(`Options[${index}].Text`, option.text || '');
      if (option.media) {
        formData.append(`Options[${index}].Media`, option.media);
      }
      const isMediaRemoved = !option.media && !this.filePreviews[option.id];
      formData.append(`Options[${index}].RemoveExistingMedia`, String(isMediaRemoved));
    });

    return formData;
  }

  addMcq(mcq: FormData) {
    this.loading = true;
    this.apiHttpService
      .addMcq(mcq)
      .pipe(
        take(1),
        tap((res: ActionResponse) => {
          this.toast.success(res?.Message);
          this.resetForm();
        }),
        catchError(error => {
          this.toast.error(error?.error?.message || ToasterMessageConstants.ERROR_ADDING_MCQ);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  editMcq(mcq: FormData) {
    this.loading = true;
    this.apiHttpService
      .updateMcq(this.existingMcqId, mcq)
      .pipe(
        take(1),
        filter(res => !!res),
        tap(res => {
          this.toast.success(res?.Message);
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

  constructChaptersFilter(): EntityFilter {
    const formValue = this.mcqForm.value;
    const chaptersFilter = new EntityFilter();
    chaptersFilter.Grade = formValue.grade;
    chaptersFilter.Subject = formValue.subject;
    chaptersFilter.Boards = formValue.boards;
    return chaptersFilter;
  }

  fetchLatestChaptersList() {
    const chaptersFilter = this.constructChaptersFilter();
    this.apiHttpService
      .getChaptersByFilter(chaptersFilter)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Chapter>) => {
          this.chapterList = res?.Items?.map(chapter => {
            const displayedChapterName = `${chapter?.Name} - ${chapter?.Board}`;
            const chapterInfo: ScopedReference = {
              RefId: chapter?.Id,
              Text: chapter?.Name,
              System: chapter?.Board,
            };
            return {
              Display: displayedChapterName,
              Value: chapterInfo,
            };
          });
        })
      )
      .subscribe();
  }

  resetForm() {
    this.mcqForm.get('statement')?.reset();
    this.mcqForm.get('correctOption')?.reset();
    
    this.optionsFormArray.controls.forEach(optionControl => {
      optionControl.patchValue({
        text: String.Empty,
        media: null,
      });
    });

    this.filePreviews = {};
    this.mediaPreview = null;
    this.attachmentsToRemove = [];
  }
}
