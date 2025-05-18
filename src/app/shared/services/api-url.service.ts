import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  static apiBaseUrl = 'https://tap-and-travel-backend.vercel.app/api/v1';
  // static apiBaseUrl = 'http://localhost:5000/api/v1';

  static getUpcomingBusesUrl(): string {
    return `${this.apiBaseUrl}/bus/future`;
  }
  static getUserTicketsUrl(userId: string): string {
    return `${this.apiBaseUrl}/ticket/user/information/${userId}`;
  }
  static loginUrl(): string {
    return `${this.apiBaseUrl}/user/login`;
  }
  static signupUrl(): string {
    return `${this.apiBaseUrl}/user/register`;
  }
  static verifySignupOtpUrl(): string {
    return `${this.apiBaseUrl}/user/verify-otp`;
  }
  static resendSignupOtpUrl(): string {
    return `${this.apiBaseUrl}/user/resend-otp`;
  }
  static sendForgotOtpUrl(): string {
    return `${this.apiBaseUrl}/user/forgot-password/send-otp`;
  }
  static verirfyForgotOtpUrl(): string {
    return `${this.apiBaseUrl}/user/forgot-password/verify-otp`;
  }
  static resetPasswordUrl(): string {
    return `${this.apiBaseUrl}/user/forgot-password/reset`;
  }
  static updateProfileUrl(): string {
    return `${this.apiBaseUrl}/user/update-profile`;
  }
  static verifyPasswordUrl(): string {
    return `${this.apiBaseUrl}/user/verify-password`;
  }
  static changePasswordUrl(): string {
    return `${this.apiBaseUrl}/user/change-password`;
  }
}
