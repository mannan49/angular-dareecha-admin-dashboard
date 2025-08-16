import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { Mcq } from '@models/entities/mcq.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { Select } from '@models/shared/select.model';
import { GradesList } from '@constants/grades-list.constant';
import { BoardsList } from '@constants/boards-list.constants';
import { SubjectsList } from '@constants/subjects-list.constants';

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
  gradesList: Select[] = GradesList;
  boardsList: Select[] = BoardsList;
  subjectsList: Select[] = SubjectsList;
  pagedMcqs: PagedResponse<Mcq>;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private toast: HotToastService,
    private apiHttpService: ApiHttpService, 
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
    filter.grade = this.selectedGrade;
    if(this.selectedBoard){
      filter.boards = [this.selectedBoard];
    }
    filter.subject = this.selectedSubject;
    filter.query = this.searchedQuery;
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

  handlePageChange(index: number) {
    const filter = this.constructMcqFilter();
    filter.pageIndex = index;
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
    return mcq?.correctOption?.refId === option?.mcqId || mcq?.correctOption?.text === option?.text;
  }

  handleSearchClick(query: string){
    this.searchedQuery = query;
    this.fetchMcqs();
  }

  onAddNewButtonClick() {
    this.router.navigate(['mcqs/form']);
  }
}
