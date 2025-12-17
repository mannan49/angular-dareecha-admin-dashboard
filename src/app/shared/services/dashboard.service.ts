import { Injectable } from '@angular/core';
import { DashboardAnalytics } from '@models/response/dashboard-analytics.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  dashboardAnalytics: DashboardAnalytics;

  getAnalytics(): DashboardAnalytics {
    return this.dashboardAnalytics;
  }

  setAnalytics(analytics: DashboardAnalytics) {
    this.dashboardAnalytics = analytics;
  }
}
