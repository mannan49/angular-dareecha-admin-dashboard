import { Seat } from './seat.model';
import { Fare } from './fare.model';
import { Route } from './route.model';
import { BusEntity } from './bus-entity.model';

export class Bus {
  busEntityId: string;
  adminId: string;
  driverId: string;
  routeId: string;
  route: Route;
  adminName: string;
  departureTime: string;
  arrivalTime: string;
  date: Date;
  endDate: Date;
  status: string;
  busDetails: BusEntity;
  seats: Seat[];
  fare: Fare;
  createdAt: Date;
  updatedAt: Date;
}
