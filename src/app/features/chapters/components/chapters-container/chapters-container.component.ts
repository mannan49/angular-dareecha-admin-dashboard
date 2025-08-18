import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { take, filter, tap, catchError, EMPTY, finalize } from 'rxjs';

import { Select } from '@models/shared/select.model';
import { Chapter } from '@models/entities/chapter.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { ActionResponse } from '@models/response/action-response.model';

import { GradesList } from '@constants/grades-list.constant';
import { BoardsList } from '@constants/boards-list.constants';
import { SubjectsList } from '@constants/subjects-list.constants';

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
  gradesList: Select[] = GradesList;
  boardsList: Select[] = BoardsList;
  subjectsList: Select[] = SubjectsList;
  pagedChapters: PagedResponse<Chapter>;

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
    if(this.selectedBoard){
      filter.boards = [this.selectedBoard];
    }
    filter.subject = this.selectedSubject;
    filter.query = this.searchedQuery;
    return filter;
  }

  getChaptersByFilter(chaptersFilter) {
    this.apiHttpService
      .getChaptersByFilter(chaptersFilter)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Chapter>) => {
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

  handleSearchClick(query: string){
    this.searchedQuery = query;
    this.fetchChapters();
  }
}
