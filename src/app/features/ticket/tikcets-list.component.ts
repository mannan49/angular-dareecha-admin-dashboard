import { Component } from '@angular/core';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { AggregatedTicket } from '@models/aggregators/aggregated-ticket.model';
import { TicketApiResponse } from '@models/response/ticket-api-response.model';

import { ActivePastConsts } from '@constants/active-past.constant';

import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-tikcets-list',
  standalone: false,
  templateUrl: './tikcets-list.component.html',
  styleUrl: './tikcets-list.component.css',
})
export class TikcetsListComponent {
  loading = false;
  allTickets: TicketApiResponse;
  filteredTickets: AggregatedTicket[] = [];
  activePastConsts = ActivePastConsts;
  filterSelected = ActivePastConsts.ACTIVE;
  userId = '6820e57cc14fbf18a0f611a7';

  constructor(private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    this.fetchTickets();
  }

  fetchTickets() {
    this.loading = true;
    this.apiHttpService
      .getUserTickets(this.userId)
      .pipe(
        take(1),
        filter(res => !!res),
        tap(res => {
          this.allTickets = res;
          this.filteredTickets = res?.[this.filterSelected];
        }),
        catchError(() => {
          window.alert('Something went wrong');
          return EMPTY;
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }

  onActiveButtonClick() {
    this.filterSelected = ActivePastConsts.ACTIVE;
    this.filteredTickets = this.allTickets?.[this.filterSelected];
  }
  onPastButtonClick() {
    this.filterSelected = ActivePastConsts.PAST;
    this.filteredTickets = this.allTickets?.[this.filterSelected];
  }
}
