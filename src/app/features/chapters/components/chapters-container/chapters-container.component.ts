import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { take, filter, tap, catchError, EMPTY, finalize } from 'rxjs';

import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { ActionResponse } from '@models/response/action-response.model';
import { ChapterAggregatedResponse } from '@models/response/chapter-aggregated-response.model';

import { HotToastService } from '@ngxpert/hot-toast';
import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-chapters-container',
  standalone: false,
  templateUrl: './chapters-container.component.html',
  styleUrl: './chapters-container.component.css',
})
export class ChaptersContainerComponent {
  loading = false;
  searchedQuery = String.Empty;
  selectedGrade = String.Empty;
  selectedBoard = String.Empty;
  selectedSubject = String.Empty;
  pagedChapters: PagedResponse<ChapterAggregatedResponse>;

  constructor(private router: Router, private toast: HotToastService, private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    this.fetchChapters();
  }

  fetchChapters() {
    this.loading = true;
    const chaptersFilter = this.constructChapterFilter();
    this.getChaptersByFilter(chaptersFilter);
  }

  constructChapterFilter(): EntityFilter {
    const filter = new EntityFilter();
    filter.grade = this.selectedGrade;
    if (this.selectedBoard) {
      filter.boards = [this.selectedBoard];
    }
    filter.subject = this.selectedSubject;
    filter.query = this.searchedQuery;
    return filter;
  }

  getChaptersByFilter(chaptersFilter: EntityFilter) {
    this.apiHttpService
      .getAggregatedChaptersByFilter(chaptersFilter)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<ChapterAggregatedResponse>) => {
          this.pagedChapters = res;
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

  handlePageChange(index: number) {
    const filter = this.constructChapterFilter();
    filter.pageIndex = index;
    this.loading = true;
    this.getChaptersByFilter(filter);
  }

  onAddNewButtonClick() {
    this.router.navigate([`chapters/form`]);
  }

  handleGradeSelectionChange(grade: string) {
    this.selectedGrade = grade;
    this.fetchChapters();
  }

  handleSubjectSelectionChange(subject: string) {
    this.selectedSubject = subject;
    this.fetchChapters();
  }

  handleBoardSelectionChange(board: string) {
    this.selectedBoard = board;
    this.fetchChapters();
  }

  handleDeleteButtonClick(chapterId: string) {
    this.apiHttpService
      .deleteChapter(chapterId)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: ActionResponse) => {
          this.toast.success(res?.message);
          this.fetchChapters();
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }

  handleSearchClick(query: string) {
    this.searchedQuery = query;
    this.fetchChapters();
  }
}
