/**
 * Служба для управления локальным хранилищем IndexedDB.
 * Храним (кэшируем) информацию о пользователе, токен аутентификации
 */

// https://github.com/jakearchibald/idb#readme
import { openDB } from "idb";


const TOKEN_KEY = "token";
const USER_KEY = "user";

interface IUser {
  address: string;
  contractNumber: string;
  createdAt: string;
  driverLicense: string;
  id: number;
  name: string;
  passport: string;
  paymentMethod: string;
  phone: string;
  transportationAnimals: false;
  updatedAt: string;
  vehicles: [];
}

const dbPromise = openDB("taxi-admin", 1, {
  upgrade(db) {
    db.createObjectStore("taxi-service");
  },
});

interface IStorageMethods { 
  get: () => {};
  set: (value: any) => void;
  remove: () => void;
}

interface IStorageSErvice {
  token: IStorageMethods;
  user: IStorageMethods;
}

const idbShifts = {
  get: async (key: string) => (await dbPromise).get("taxi-service", key),
  set: async (key: string, value: any) => (await dbPromise).put("taxi-service", value, key),
  delete: async (key: string) => (await dbPromise).delete("taxi-service", key),
  clear: async () => (await dbPromise).clear("taxi-service"),
};

const StorageService: IStorageSErvice = {
  token: {
    get: () => idbShifts.get(TOKEN_KEY),
    set: (accessToken: string) => idbShifts.set(TOKEN_KEY, accessToken),
    remove: () => idbShifts.delete(TOKEN_KEY),
  },
  user: {
    get: () => idbShifts.get(USER_KEY),
    set: (user: IUser) => idbShifts.set(USER_KEY, user),
    remove: () => idbShifts.delete(USER_KEY),
  }
};

export default StorageService;
