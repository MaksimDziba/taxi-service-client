import ITariff from "./Tariff";
import IClient from "./Client";

interface IOrder {
  id?: number;

  addressFrom: string;

  addressTo: string;

  timeOrder?: string;

  maxCountPassenger?: number;

  preOrderCost: number;

  transportationAnimals: boolean;

  babyChair: boolean;

  operatorName: string;

  tariffID?: number;

  tariff?: ITariff;

  clientID?: number;

  client?: IClient;
}

export { IOrder };
