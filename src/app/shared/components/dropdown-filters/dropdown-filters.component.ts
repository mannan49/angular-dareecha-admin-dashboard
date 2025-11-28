import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { take, filter, tap, catchError, EMPTY } from 'rxjs';

import { Select } from '@models/shared/select.model';
import { Chapter } from '@models/entities/chapter.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { GradesList } from '@constants/grades-list.constant';
import { BoardsList } from '@constants/boards-list.constants';
import { SubjectsList } from '@constants/subjects-list.constants';

import { DropdownComponent } from '../dropdown/dropdown.component';
import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-dropdown-filters',
  imports: [DropdownComponent, CommonModule],
  templateUrl: './dropdown-filters.component.html',
  styleUrl: './dropdown-filters.component.css',
})
export class DropdownFiltersComponent {
  selectedGrade = String.Empty;
  selectedBoard = String.Empty;
  selectedSubject = String.Empty;
  selectedChapterId = String.Empty;
  chaptersList: Select[] = [];
  gradesList: Select[] = GradesList;
  boardsList: Select[] = BoardsList;
  subjectsList: Select[] = SubjectsList;
  
  @Input() showChaptersFilter = false;
  @Input() styleClasses = "grid-cols-3";
  @Output() boardSelected = new EventEmitter<string>();
  @Output() gradeSelected = new EventEmitter<string>();
  @Output() subjectSelected = new EventEmitter<string>();
  @Output() chapterSelected = new EventEmitter<string>();

  constructor(private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    if (this.showChaptersFilter) {
      this.fetchChapters();
    }
  }

  fetchChapters() {
    const chapterFilter = this.constructChapterFilter();
    this.getChaptersByFilter(chapterFilter);
  }

  constructChapterFilter(): EntityFilter {
    const filter = new EntityFilter();
    filter.Grade = this.selectedGrade;
    if (this.selectedBoard) {
      filter.Boards = [this.selectedBoard];
    }
    filter.Subject = this.selectedSubject;
    filter.Limit = 200;
    return filter;
  }

  getChaptersByFilter(payload: EntityFilter) {
    this.apiHttpService
      .getChaptersByFilter(payload)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Chapter>) => {
          this.chaptersList = res?.Items?.map(chapter => {
            return {
              Display: chapter?.Name,
              Value: chapter?.Id,
            };
          });
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }

  handleGradeSelectionChange(grade: string) {
    this.selectedGrade = grade;
    this.gradeSelected.emit(grade);
    if (this.showChaptersFilter) {
      this.fetchChapters();
    }
  }

  handleSubjectSelectionChange(subject: string) {
    this.selectedSubject = subject;
    this.subjectSelected.emit(subject);
    if (this.showChaptersFilter) {
      this.fetchChapters();
    }
  }

  handleBoardSelectionChange(board: string) {
    this.selectedBoard = board;
    this.boardSelected.emit(board);
    if (this.showChaptersFilter) {
      this.fetchChapters();
    }
  }

  handleChapterSelectionChange(chapterId: string) {
    this.chapterSelected.emit(chapterId);
  }
}
