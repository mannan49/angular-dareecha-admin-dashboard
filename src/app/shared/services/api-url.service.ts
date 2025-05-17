import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
//   static apiBaseUrl = 'https://tap-and-travel-backend.vercel.app/api/v1';
    static apiBaseUrl = 'http://localhost:5000/api/v1';

  static getUpcomingBuses(): string {
    return `${this.apiBaseUrl}/bus/future`;
  }
}
