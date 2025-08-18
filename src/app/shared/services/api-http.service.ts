import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Mcq } from '@models/entities/mcq.model';
import { Note } from '@models/entities/note.model';
import { Chapter } from '@models/entities/chapter.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { AuthResponse } from '@models/response/auth-response.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { ActionResponse } from '@models/response/action-response.model';

import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.get<AuthResponse>(ApiUrlService.loginUrl(email, password), { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.httpClient.get<any>(ApiUrlService.logout(), { withCredentials: true });
  }

  refreshToken(): Observable<AuthResponse> {
    return this.httpClient.get<AuthResponse>(ApiUrlService.refreshTokenUrl(), { withCredentials: true });
  }

  getNotesByFilter(filter: EntityFilter): Observable<PagedResponse<Note>> {
    return this.httpClient.post<PagedResponse<Note>>(ApiUrlService.getNotesByFilterUrl(), filter);
  }

  getMcqsByFilter(filter: EntityFilter): Observable<PagedResponse<Mcq>> {
    return this.httpClient.post<PagedResponse<Mcq>>(ApiUrlService.getMcqsByFilterUrl(), filter);
  }

  getChaptersByFilter(filter: EntityFilter): Observable<PagedResponse<Chapter>> {
    return this.httpClient.post<PagedResponse<Chapter>>(ApiUrlService.getChaptersByFilterUrl(), filter);
  }

  addMcq(mcq: FormData): Observable<ActionResponse> {
    return this.httpClient.post<ActionResponse>(ApiUrlService.addMcqUrl(), mcq);
  }

  addNote(note: FormData): Observable<ActionResponse> {
    return this.httpClient.post<ActionResponse>(ApiUrlService.addNoteUrl(), note);
  }

  updateMcq(id: string, mcq: FormData): Observable<ActionResponse> {
    return this.httpClient.put<ActionResponse>(ApiUrlService.mcqByIdUrl(id), mcq);
  }

  updateNote(id: string, note: FormData): Observable<ActionResponse> {
    return this.httpClient.put<ActionResponse>(ApiUrlService.noteByIdUrl(id), note);
  }

  deleteMcq(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(ApiUrlService.mcqByIdUrl(id));
  }

  getMcqById(id: string): Observable<Mcq> {
    return this.httpClient.get<Mcq>(ApiUrlService.mcqByIdUrl(id));
  }

  addChapter(chapter: FormData): Observable<ActionResponse> {
    return this.httpClient.post<ActionResponse>(ApiUrlService.addChapterUrl(), chapter);
  }

  deleteChapter(id: string): Observable<ActionResponse> {
    return this.httpClient.delete<ActionResponse>(ApiUrlService.chapterByIdUrl(id));
  }

  deleteNote(id: string): Observable<ActionResponse> {
    return this.httpClient.delete<ActionResponse>(ApiUrlService.noteByIdUrl(id));
  }

  editChapter(id: string, chapter: FormData): Observable<ActionResponse> {
    return this.httpClient.put<ActionResponse>(ApiUrlService.chapterByIdUrl(id), chapter);
  }

  getChapterById(id: string): Observable<Chapter> {
    return this.httpClient.get<Chapter>(ApiUrlService.chapterByIdUrl(id));
  }
}
