import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { Mcq } from '@models/entities/mcq.model';
import { McqItem } from '@models/shared/mcq-item.model';
import { Chapter } from '@models/entities/chapter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { ToasterMessageConstants } from '@constants/toaster-message.constant';

import { HotToastService } from '@ngxpert/hot-toast';
import { ApiHttpService } from '@shared/services/api-http.service';
import { McqBatchUploadDto } from '@models/payload/mcq-batch-upload-dto';
import { ScopedReference } from '@models/shared/scoped-reference.model';
import { DifficultyLevelList } from '@constants/difficulty-level-list.constants';

@Component({
  selector: 'app-mcqs-ocr',
  standalone: false,
  templateUrl: './mcqs-ocr.component.html',
  styleUrl: './mcqs-ocr.component.css',
})
export class McqsOcrComponent {
  file: File;
  loading = false;
  generatingMcqs = false;
  chapter: Chapter;
  mcqData: McqItem[] = [];
  selectedChapterId = String.Empty;
  extractedOcrText: string;
  mediaPreview: string | ArrayBuffer | null = null;

  constructor(private route: ActivatedRoute, private apiHttpService: ApiHttpService, private toast: HotToastService) {
    this.selectedChapterId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchChapterData();
  }

  fetchChapterData() {
    this.apiHttpService
      .getChapterById(this.selectedChapterId)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: Chapter) => {
          this.chapter = res;
          // this.patchChapterForm(res);
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          // this.chapterLoading = false;
        })
      )
      .subscribe();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      // this.mcqForm.patchValue({ media: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.mediaPreview = reader.result;
        this.onAnalyzeButtonClick();
      };
      reader.readAsDataURL(this.file);
    }
  }

  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    const items = clipboardData.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            this.file = file;

            const reader = new FileReader();
            reader.onload = () => {
              this.mediaPreview = reader.result;
              this.onAnalyzeButtonClick(); // same as file input
            };
            reader.readAsDataURL(file);
          }
          event.preventDefault(); // prevent browser default paste behavior
          return; // stop after first image
        }
      }
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  removeUploadedMedia() {
    this.mediaPreview = null;
    this.extractedOcrText = String.Empty;
  }

  onAnalyzeButtonClick() {
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.file);
    this.apiHttpService
      .getOcrText(formData)
      .pipe(
        take(1),
        tap(res => {
          this.extractedOcrText = res?.Text;
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.GENERAL_ERROR);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  handleSubmitButtonClick(mcqItems: McqItem[]) {
    const payload = this.buildBatchMcqPayload(mcqItems);
    this.apiHttpService
      .batchMcqs(payload)
      .pipe(
        take(1),
        filter(res => !!res),
        tap(res => {
          this.toast.success(res?.Message);
          this.resetData();
        }),
        catchError(err => {
          const { error } = err;
          this.toast.error(error?.message || ToasterMessageConstants.GENERAL_ERROR);
          return EMPTY;
        })
      )
      .subscribe();
  }

  buildBatchMcqPayload(mcqItems: McqItem[]): McqBatchUploadDto {
    const payload = new McqBatchUploadDto();
    payload.Mcqs = mcqItems;
    payload.Boards = [this.chapter?.Board];
    const chapterReference = new ScopedReference();
    chapterReference.RefId = this.chapter?.Id;
    chapterReference.Text = this.chapter?.Name;
    chapterReference.System = this.chapter?.Board;
    payload.Chapters = [chapterReference];
    payload.DifficultyLevel = 'Medium';
    payload.Subject = this.chapter?.Subject;
    payload.Grade = this.chapter?.Grade;
    return payload;
  }

  onGenerateButtonClick() {
    this.generatingMcqs = true;
    const payload = {
      Text: this.extractedOcrText,
    };
    this.apiHttpService
      .generateMcqsFromOcrTextUrl(payload)
      .pipe(
        take(1),
        tap(res => {
          this.mcqData = res;
          this.toast.success(`${res?.length} Mcqs have been found in the attachment.`);
        }),
        finalize(() => {
          this.generatingMcqs = false;
        })
      )
      .subscribe();
  }

  handleAllMcqsDeletion() {
    this.mcqData = [];
  }

  resetData() {
    this.mediaPreview = null;
    this.mcqData = [];
    this.extractedOcrText = String.Empty;
  }
}
