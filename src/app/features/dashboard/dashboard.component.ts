import { Component } from '@angular/core';

import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  loading = false;

  constructor(private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    // this.fetchUpcomingBuses();
  }

 
}
