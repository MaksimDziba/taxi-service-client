export interface IOrder {
  id?: number;

  addressFrom: string;

  addressTo: string;

  timeOrder: string;

  maxCountPassenger: number;

  preOrderCost: number;

  operatorName: string;

  tariffID: number;

  clientID: number;
}
