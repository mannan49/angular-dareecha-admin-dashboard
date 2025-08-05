import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  static apiBaseUrl = 'http://localhost:5057/api/v1';

  static loginUrl(): string {
    return `${this.apiBaseUrl}/user/login`;
  }
  static getNotesByFilter() : string{
    return `${this.apiBaseUrl}/Note/advance-search`;
  }
}
