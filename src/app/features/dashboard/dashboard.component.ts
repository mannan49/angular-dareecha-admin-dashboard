import { Component } from '@angular/core';

import { catchError, EMPTY, filter, take, tap } from 'rxjs';

import { Bus } from '@models/bus.model';

import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  buses: Bus[] = [];

  constructor(private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    this.fetchUpcomingBuses();
  }

  fetchUpcomingBuses() {
    this.apiHttpService
      .getUpcomingBuses()
      .pipe(
        take(1),
        filter(res => !!res),
        tap(res => {
          console.log('Buses', res);
          this.buses = res;
        }),
        catchError(error => {
          window.alert('Something went wrong');
          return EMPTY;
        })
      )
      .subscribe();
  }
}
