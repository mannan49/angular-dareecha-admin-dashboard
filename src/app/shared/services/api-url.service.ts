import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {

  static apiBaseUrl = environment.apiBaseUrl;

  //#region Auth

  static loginUrl(email: string, password: string): string {
    return `${this.apiBaseUrl}/user/login?email=${email}&password=${password}&role=Admin`;
  }

  static refreshTokenUrl(): string {
    return `${this.apiBaseUrl}/user/refresh-token`;
  }

  static resetPasswordUrl(currentPassword:string, newPassword:string): string {
    return `${this.apiBaseUrl}/user/reset-password?currentPassword=${currentPassword}&newPassword=${newPassword}`;
  }

  static logout(): string {
    return `${this.apiBaseUrl}/user/logout`;
  }
  // #endregion;

  //#region Mcq

  static mcqByIdUrl(id: string): string {
    return `${this.apiBaseUrl}/Mcq/${id}`;
  }

  static getMcqsByFilterUrl(): string {
    return `${this.apiBaseUrl}/Mcq/advance-search`;
  }

  static addMcqUrl(): string {
    return `${this.apiBaseUrl}/Mcq`;
  }

  // #endregion;

  //#region Note

  static getNotesByFilterUrl(): string {
    return `${this.apiBaseUrl}/Note/advance-search`;
  }

  static addNoteUrl(): string {
    return `${this.apiBaseUrl}/Note`;
  }

  static noteByIdUrl(id: string): string {
    return `${this.apiBaseUrl}/Note/${id}`;
  }

  // #endregion;

  //#region Chapter

  static getChaptersByFilterUrl(): string {
    return `${this.apiBaseUrl}/Chapter/advance-search`;
  }

  static getAggregatedChaptersByFilterUrl(): string {
    return `${this.apiBaseUrl}/Chapter/aggregated-advance-search`;
  }

  static addChapterUrl(): string {
    return `${this.apiBaseUrl}/Chapter`;
  }

  static chapterByIdUrl(id: string): string {
    return `${this.apiBaseUrl}/Chapter/${id}`;
  }

  // #endregion;

  //#region S3

  static generatePreSignedUrl(fileType: string){
    return `${this.apiBaseUrl}/S3/generate-upload-url?fileType=${fileType}`;
  }

  //#endregion
}
