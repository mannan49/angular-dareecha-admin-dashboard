import { AggregatedTicket } from "@models/aggregators/aggregated-ticket.model";

export class TicketApiResponse {
  active: AggregatedTicket[];
  past: AggregatedTicket[];
}
