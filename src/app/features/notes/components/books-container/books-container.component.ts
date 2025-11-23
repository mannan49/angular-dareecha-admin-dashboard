import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { Note } from '@models/entities/note.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { ActionResponse } from '@models/response/action-response.model';

import { ResourceType } from '@constants/resource-type.constans';
import { ToasterMessageConstants } from '@constants/toaster-message.constant';

import { HotToastService } from '@ngxpert/hot-toast';
import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-books-container',
  standalone: false,
  templateUrl: './books-container.component.html',
  styleUrl: './books-container.component.css',
})
export class BooksContainerComponent {
  loading = false;
  searchedQuery = String.Empty;
  selectedGrade = String.Empty;
  selectedBoard = String.Empty;
  selectedSubject = String.Empty;
  pagedNotes: PagedResponse<Note>;

  constructor(private router: Router, private toast: HotToastService, private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.loading = true;
    const chaptersFilter = this.constructNotesFilter();
    this.getNotesByFilter(chaptersFilter);
  }

  constructNotesFilter(): EntityFilter {
    const filter = new EntityFilter();
    filter.grade = this.selectedGrade;
    if (this.selectedBoard) {
      filter.boards = [this.selectedBoard];
    }
    filter.types = [ResourceType.HELPING_BOOK, ResourceType.TEXT_BOOK];
    filter.subject = this.selectedSubject;
    filter.query = this.searchedQuery;
    return filter;
  }

  getNotesByFilter(notesFilter: EntityFilter) {
    this.apiHttpService
      .getNotesByFilter(notesFilter)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Note>) => {
          this.pagedNotes = res;
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

  onAddNewButtonClick() {
    this.router.navigate(['notes/form'], {
      queryParams: { type: 'textbook' },
    });
  }

  handleGradeSelectionChange(grade: string) {
    this.selectedGrade = grade;
    this.fetchNotes();
  }

  handleSubjectSelectionChange(subject: string) {
    this.selectedSubject = subject;
    this.fetchNotes();
  }

  handleBoardSelectionChange(board: string) {
    this.selectedBoard = board;
    this.fetchNotes();
  }

  handleSearchClick(query: string) {
    this.searchedQuery = query;
    this.fetchNotes();
  }

  handlePageChange(index: number) {
    const filter = this.constructNotesFilter();
    filter.pageIndex = index;
    this.loading = true;
    this.getNotesByFilter(filter);
  }

  handleDeleteButtonClick(noteId: string) {
    this.loading = true;
    this.apiHttpService
      .deleteNote(noteId)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: ActionResponse) => {
          this.toast.success(res?.message);
        }),
        catchError(error => {
          this.toast.error(error?.error?.message || ToasterMessageConstants.ERROR_DELETING_NOTE);
          return EMPTY;
        }),
        finalize(() => {
          this.fetchNotes();
        })
      )
      .subscribe();
  }
}
