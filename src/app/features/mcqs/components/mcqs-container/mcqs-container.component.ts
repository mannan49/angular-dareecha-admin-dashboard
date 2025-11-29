import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { Mcq } from '@models/entities/mcq.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { HotToastService } from '@ngxpert/hot-toast';
import { DialogService } from '@shared/services/dialog.service';
import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-mcqs-container',
  standalone: false,
  templateUrl: './mcqs-container.component.html',
  styleUrl: './mcqs-container.component.css',
})
export class McqsContainerComponent {
  loading = false;
  searchedQuery = String.Empty;
  selectedGrade = String.Empty;
  selectedBoard = String.Empty;
  selectedSubject = String.Empty;
  selectedChapterId = String.Empty;
  pagedMcqs: PagedResponse<Mcq>;

  constructor(
    private router: Router,
    private toast: HotToastService,
    private dialogService: DialogService,
    private apiHttpService: ApiHttpService
  ) {}

  ngOnInit() {
    this.fetchMcqs();
  }

  fetchMcqs() {
    this.loading = true;
    const mcqFilter = this.constructMcqFilter();
    this.getMcqsByFilter(mcqFilter);
  }

  constructMcqFilter(): EntityFilter {
    const filter = new EntityFilter();
    filter.Grade = this.selectedGrade;
    if (this.selectedBoard) {
      filter.Boards = [this.selectedBoard];
    }
    filter.Subject = this.selectedSubject;
    filter.Query = this.searchedQuery;
    if (this.selectedChapterId) {
      filter.ChapterIds = [this.selectedChapterId];
    }
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

  handleGradeSelectionChange(grade: string) {
    this.selectedGrade = grade;
    this.fetchMcqs();
  }

  handleSubjectSelectionChange(subject: string) {
    this.selectedSubject = subject;
    this.fetchMcqs();
  }

  handleBoardSelectionChange(board: string) {
    this.selectedBoard = board;
    this.fetchMcqs();
  }

  handleChapterSelectionChange(chapterId: string) {
    this.selectedChapterId = chapterId;
    this.fetchMcqs();
  }

  handlePageChange(index: number) {
    const filter = this.constructMcqFilter();
    filter.PageIndex = index;
    this.getMcqsByFilter(filter);
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
}
