import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Bus } from '@models/bus.model';

import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private httpClient: HttpClient) {}

  getUpcomingBuses(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(ApiUrlService.getUpcomingBuses());
  }
}
