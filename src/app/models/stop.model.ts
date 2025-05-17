import { Geometry } from './geometry.model';

export class Stop {
  name: string;
  formattedAddress: string;
  placeId: string;
  geometry: Geometry;
  locationLink: string;
  duration: number;
}
