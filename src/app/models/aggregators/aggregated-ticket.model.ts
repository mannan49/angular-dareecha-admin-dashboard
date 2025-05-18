import { Fare } from '@models/fare.model';
import { Seat } from '@models/seat.model';
import { Route } from '@models/route.model';
import { BusEntity } from '@models/bus-entity.model';

export class AggregatedTicket {
  _id: string;
  userId: string;
  busId: string;
  adminId: string;
  user: string;
  phoneNumber: string;
  adminName: string;
  route: Route;
  fare: Fare;
  busDetails: BusEntity;
  departureTime: string;
  arrivalTime: string;
  busCapacity: number;
  seatNumber: string;
  seatDetails: Seat;
  date: Date;
  ticketStatus: string;
  endDate: Date;
  busStatus: string;
}
