import { Component } from '@angular/core';

import { catchError, EMPTY, finalize, take, tap } from 'rxjs';

import { DashboardAnalytics } from '@models/response/dashboard-analytics.model';

import { ApiHttpService } from '@shared/services/api-http.service';
import { DashboardService } from '@shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  loading = false;
  analytics: DashboardAnalytics;

  constructor(private apiHttpService: ApiHttpService, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.analytics = this.dashboardService.getAnalytics();
    console.log("Hello", this.analytics);
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    if(!this.analytics?.Mcqs) {
      this.loading = true;
    }
    this.apiHttpService
      .getDashboardAnalytics()
      .pipe(
        take(1),
        tap((res: DashboardAnalytics) => {
          this.analytics = res;
          this.dashboardService.setAnalytics(res);
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
