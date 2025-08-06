import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Note } from '@models/entities/note.model';
import { NoteFilter } from '@models/payload/note-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { ApiUrlService } from './api-url.service';
import { AuthResponse } from '@models/response/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.get<AuthResponse>(ApiUrlService.loginUrl(email, password), { withCredentials: true });
  }

  logout() : Observable<any>{
    return this.httpClient.get<any>(ApiUrlService.logout(), { withCredentials: true })
  }

  refreshToken(): Observable<AuthResponse> {
    return this.httpClient.get<AuthResponse>(ApiUrlService.refreshTokenUrl(), { withCredentials: true });
  }

  getNotesByFilter(filter: NoteFilter) : Observable<PagedResponse<Note>> {
    return this.httpClient.post<PagedResponse<Note>>(ApiUrlService.getNotesByFilter(), filter);
  }
}
