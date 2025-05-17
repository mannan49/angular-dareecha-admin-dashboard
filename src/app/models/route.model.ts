import { Stop } from "./stop.model";

export class Route {
  adminId: string;
  startCity: string;
  endCity: string;
  stops: Stop[];
}
