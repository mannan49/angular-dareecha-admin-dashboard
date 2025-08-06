import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  static apiBaseUrl = 'http://localhost:5057/api/v1';

  static loginUrl(email: string, password: string): string {
    return `${this.apiBaseUrl}/user/login?email=${email}&password=${password}&role=Admin`;
  }

  static refreshTokenUrl(): string {
    return `${this.apiBaseUrl}/user/refresh-token`;
  }

  static logout(): string {
    return `${this.apiBaseUrl}/user/logout`;
  }

  static getNotesByFilter() : string{
    return `${this.apiBaseUrl}/Note/advance-search`;
  }
}
