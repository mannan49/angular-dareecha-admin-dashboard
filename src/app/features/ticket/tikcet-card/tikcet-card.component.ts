import { Component, Input } from '@angular/core';
import { ActivePastConsts } from '@constants/active-past.constant';

import { AggregatedTicket } from '@models/aggregators/aggregated-ticket.model';

@Component({
  selector: 'app-tikcet-card',
  standalone: false,
  templateUrl: './tikcet-card.component.html',
  styleUrl: './tikcet-card.component.css',
})
export class TikcetCardComponent {
  @Input() ticket: AggregatedTicket;
  @Input() filterSelected = ActivePastConsts.ACTIVE;
}
