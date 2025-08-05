import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Note } from '@models/entities/note.model';
import { NoteFilter } from '@models/payload/note-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private httpClient: HttpClient) {}

  // login(payload: LoginPayload): Observable<LoginApiResponse> {
  //   return this.httpClient.post<LoginApiResponse>(ApiUrlService.loginUrl(), payload);
  // }

  getNotesByFilter(filter: NoteFilter) : Observable<PagedResponse<Note>> {
    return this.httpClient.post<PagedResponse<Note>>(ApiUrlService.getNotesByFilter(), filter);
  }
}
