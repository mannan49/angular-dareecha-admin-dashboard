import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


import { Bus } from '@models/bus.model';
import { LoginPayload } from '@models/payload/login-payload.model';
import { SignupPayload } from '@models/payload/signup-payload.model';
import { LoginApiResponse } from '@models/response/login-api-response.model';
import { SignupApiResponse } from '@models/response/signup-api-response.model';
import { TicketApiResponse } from '@models/response/ticket-api-response.model';
import { ResetPasswordPayload } from '@models/payload/reset-password-payload.model';
import { OtpVerificationPayload } from '@models/payload/otp-verification-payload.model';
import { ForgotOtpVerificationApiResponse } from '@models/response/forgot-otp-verification-api-response.model';

import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private httpClient: HttpClient) {}

  getUpcomingBuses(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(ApiUrlService.getUpcomingBusesUrl());
  }

  getUserTickets(userId: string): Observable<TicketApiResponse> {
    return this.httpClient.get<TicketApiResponse>(ApiUrlService.getUserTicketsUrl(userId));
  }

  login(payload: LoginPayload): Observable<LoginApiResponse> {
    return this.httpClient.post<LoginApiResponse>(ApiUrlService.loginUrl(), payload);
  }

  signup(payload: SignupPayload): Observable<SignupApiResponse> {
    return this.httpClient.post<SignupApiResponse>(ApiUrlService.signupUrl(), payload);
  }

  signupOtpVerification(payload: OtpVerificationPayload): Observable<LoginApiResponse> {
    return this.httpClient.post<LoginApiResponse>(ApiUrlService.verifySignupOtpUrl(), payload);
  }

  resendSignupOtp(email: string): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(ApiUrlService.resendSignupOtpUrl(), { email });
  }

  requestForgotPasswordOtp(email: string): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(ApiUrlService.sendForgotOtpUrl(), { email });
  }

  forgotOtpVerification(payload: OtpVerificationPayload): Observable<ForgotOtpVerificationApiResponse> {
    return this.httpClient.post<ForgotOtpVerificationApiResponse>(ApiUrlService.verirfyForgotOtpUrl(), payload);
  }

  resetPassword(payload: ResetPasswordPayload): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(ApiUrlService.resetPasswordUrl(), payload);
  }
}
