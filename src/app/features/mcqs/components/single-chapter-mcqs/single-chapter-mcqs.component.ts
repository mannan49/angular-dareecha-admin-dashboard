import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { Mcq } from '@models/entities/mcq.model';
import { Chapter } from '@models/entities/chapter.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { HotToastService } from '@ngxpert/hot-toast';
import { DialogService } from '@shared/services/dialog.service';
import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-single-chapter-mcqs',
  standalone: false,
  templateUrl: './single-chapter-mcqs.component.html',
  styleUrl: './single-chapter-mcqs.component.css',
})
export class SingleChapterMcqsComponent {
  loading = false;
  chapter: Chapter;
  searchedQuery = String.Empty;
  selectedChapterId = String.Empty;
  subjectAndClassName = String.Empty;
  pagedMcqs: PagedResponse<Mcq>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private dialogService: DialogService,
    private apiHttpService: ApiHttpService
  ) {
    this.selectedChapterId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchChapter();
    this.fetchMcqs();
  }

  fetchChapter() {
    this.apiHttpService
      .getChapterById(this.selectedChapterId)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: Chapter) => {
          this.chapter = res;
          this.subjectAndClassName = res?.Grade + ' : ' + res?.Subject;
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }
  fetchMcqs() {
    this.loading = true;
    const mcqFilter = this.constructMcqFilter();
    this.getMcqsByFilter(mcqFilter);
  }

  constructMcqFilter(): EntityFilter {
    const filter = new EntityFilter();
    filter.Query = this.searchedQuery;
    filter.ChapterIds = [this.selectedChapterId];
    filter.Limit = 999;
    return filter;
  }

  getMcqsByFilter(payload: EntityFilter) {
    this.apiHttpService
      .getMcqsByFilter(payload)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Mcq>) => {
          this.pagedMcqs = res;
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  handleDeleteMcq(id: string) {
    this.apiHttpService
      .deleteMcq(id)
      .pipe(
        take(1),
        tap(() => {
          this.toast.success('Mcq Deleted Successfully');
          this.fetchMcqs();
        }),
        catchError(() => {
          this.toast.error('Error deleting MCQ');
          return EMPTY;
        })
      )
      .subscribe();
  }

  isCorrectOption(mcq: Mcq, option: McqOption): boolean {
    return mcq?.CorrectOption?.RefId === option?.OptionId || mcq?.CorrectOption?.Text === option?.Text;
  }

  handleSearchClick(query: string) {
    this.searchedQuery = query;
    this.fetchMcqs();
  }

  onAddNewButtonClick() {
    this.router.navigate(['mcqs/form']);
  }

  onAddMcqsByAIButtonClick() {
    this.router.navigate([`mcqs/${this.selectedChapterId}/ocr`]);
  }
}
