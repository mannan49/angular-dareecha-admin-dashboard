import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  // static apiBaseUrl = 'http://localhost:5057/api/v1';
  static apiBaseUrl = 'https://dareecha-api.online/api/v1';

  static loginUrl(email: string, password: string): string {
    return `${this.apiBaseUrl}/user/login?email=${email}&password=${password}&role=Admin`;
  }

  static refreshTokenUrl(): string {
    return `${this.apiBaseUrl}/user/refresh-token`;
  }

  static logout(): string {
    return `${this.apiBaseUrl}/user/logout`;
  }

  static getNotesByFilterUrl() : string{
    return `${this.apiBaseUrl}/Note/advance-search`;
  }

  static getMcqsByFilterUrl() : string{
    return `${this.apiBaseUrl}/Mcq/advance-search`;
  }

  static addMcqUrl() : string{
    return `${this.apiBaseUrl}/Mcq`;
  }

  static addNoteUrl() : string{
    return `${this.apiBaseUrl}/Note`;
  }

  static addChapterUrl() : string{
    return `${this.apiBaseUrl}/Chapter`;
  }

  static mcqByIdUrl(id: string) : string {
    return `${this.apiBaseUrl}/Mcq/${id}`
  }

  static noteByIdUrl(id: string) : string {
    return `${this.apiBaseUrl}/Note/${id}`
  }

  static getChaptersByFilterUrl() : string {
    return `${this.apiBaseUrl}/Chapter/advance-search`
  }

  static chapterByIdUrl(id: string) : string {
    return `${this.apiBaseUrl}/Chapter/${id}`;
  }
}
