import {
  CreateCurrencyResponseSchema,
  DeleteCurrencyResponseSchema,
  getAllCurrencies,
  type CreateCurrency,
  type CreateCurrencyResponse,
  type DeleteCurrencyResponse,
  type GetAllCurrencies,
} from "../types/AdminSchemas/Currency";
import { superFetch } from "./superfetch/superfetch";
import { SuperFetchError } from "./superfetch/types";

export default class CurrencyController {
  static async getAllCurrencies(): Promise<GetAllCurrencies> {
    try {
      const res = await superFetch<
        undefined,
        GetAllCurrencies,
        "getAllCurrencies"
      >({
        options: {
          method: "GET",
        },
        route: "getAllCurrencies",
        responseSchema: getAllCurrencies,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.error("Error fetching currencies:", sf.message);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async NewCurrency(
    payload: CreateCurrency
  ): Promise<CreateCurrencyResponse> {
    try {
      const res = await superFetch<
        CreateCurrency,
        CreateCurrencyResponse,
        "newCurrency"
      >({
        options: {
          method: "POST",
        },
        route: "newCurrency",
        responseSchema: CreateCurrencyResponseSchema,
        payload: payload,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.error("Error creating currency:", sf.message);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async DeleteCurrency(id: string): Promise<DeleteCurrencyResponse> {
    try {
      const res = await superFetch<
        undefined,
        DeleteCurrencyResponse,
        "deleteCurrency"
      >({
        options: {
          method: "DELETE",
        },
        route: "deleteCurrency",
        routeParams: [id],
        responseSchema: DeleteCurrencyResponseSchema,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.error("Error deleting currency:", sf.message);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }
}
