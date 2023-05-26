import { IShifts } from './Shift';
import { IVehicle } from './Vehicle';

export interface IDriver {
  id: number;
  address: string;
  contractNumber: string;
  createdAt: string;
  driverLicense: string;
  name: string;
  passport: string;
  paymentMethod: string;
  phone: string;
  shifts: IShifts[];
  transportationAnimals: boolean;
  updatedAt: Date
  vehicles: IVehicle[];
}