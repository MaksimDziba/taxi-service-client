import { IDriver } from "./Driver";

export interface IVehicle {
  id: number;

  gosNumber: string;

  dateManufacture: Date;

  carModel: string;

  carColor: string;

  capacity: string;

  babyChair: boolean;

  maxCountPassenger: number;

  drivers: IDriver[];
}
