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

  // signup(payload: SignupPayload): Observable<SignupApiResponse> {
  //   return this.httpClient.post<SignupApiResponse>(ApiUrlService.signupUrl(), payload);
  // }

  // signupOtpVerification(payload: OtpVerificationPayload): Observable<LoginApiResponse> {
  //   return this.httpClient.post<LoginApiResponse>(ApiUrlService.verifySignupOtpUrl(), payload);
  // }

  // resendSignupOtp(email: string): Observable<{ message: string }> {
  //   return this.httpClient.post<{ message: string }>(ApiUrlService.resendSignupOtpUrl(), { email });
  // }

  // requestForgotPasswordOtp(email: string): Observable<{ message: string }> {
  //   return this.httpClient.post<{ message: string }>(ApiUrlService.sendForgotOtpUrl(), { email });
  // }

  // forgotOtpVerification(payload: OtpVerificationPayload): Observable<ForgotOtpVerificationApiResponse> {
  //   return this.httpClient.post<ForgotOtpVerificationApiResponse>(ApiUrlService.verirfyForgotOtpUrl(), payload);
  // }

  // resetPassword(payload: ResetPasswordPayload): Observable<{ message: string }> {
  //   return this.httpClient.post<{ message: string }>(ApiUrlService.resetPasswordUrl(), payload);
  // }

  getNotesByFilter(filter: NoteFilter) : Observable<PagedResponse<Note>> {
    return this.httpClient.post<PagedResponse<Note>>(ApiUrlService.getNotesByFilter(), filter);
  }
}
