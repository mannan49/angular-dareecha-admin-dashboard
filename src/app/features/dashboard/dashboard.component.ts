import { Component } from '@angular/core';

import { catchError, EMPTY, finalize, take, tap } from 'rxjs';

import { ApiHttpService } from '@shared/services/api-http.service';
import { DashboardAnalytics } from '@models/response/dashboard-analytics.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  loading = true;
  analytics: DashboardAnalytics;

  constructor(private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    this.loading = true;
    this.apiHttpService
      .getDashboardAnalytics()
      .pipe(
        take(1),
        tap((res: DashboardAnalytics) => {
          this.analytics = res;
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(()=>{
          this.loading = false;
        })
      )
      .subscribe();
  }
}
