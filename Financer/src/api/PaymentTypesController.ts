import {
  AllTypesResponseSchema,
  DeletePaymentTypeResponseSchema,
  NewPaymentResponseSchema,
  SingleTypeResponseSchema,
  type AllTypesResponse,
  type DeletePaymentTypeResponse,
  type NewPaymentResponse,
  type NewPaymentTypeRequest,
  type SingleTypeResponse,
} from "../types/AdminSchemas/PaymentTypes";
import { superFetch } from "./superfetch/superfetch";
import { SuperFetchError } from "./superfetch/types";

export class PaymentTypesController {
  static async getAllTypes(): Promise<AllTypesResponse> {
    try {
      const res = await superFetch<undefined, AllTypesResponse, "getAllTypes">({
        options: {
          method: "GET",
        },
        route: "getAllTypes",
        responseSchema: AllTypesResponseSchema,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error fetching payment types:", sf.message);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async getSingleType(id: string): Promise<SingleTypeResponse> {
    try {
      const res = await superFetch<
        undefined,
        SingleTypeResponse,
        "getSingleType"
      >({
        options: {
          method: "GET",
        },
        route: "getSingleType",
        routeParams: [id],
        responseSchema: SingleTypeResponseSchema,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error fetching single payment type:", sf.message);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async newType(
    payload: NewPaymentTypeRequest
  ): Promise<NewPaymentResponse> {
    console.log(payload);
    try {
      const res = await superFetch<
        NewPaymentTypeRequest,
        NewPaymentResponse,
        "new"
      >({
        options: {
          method: "POST",
          includeCredentials: false, //TODO: Change this to work with tokens
        },
        route: "new",
        responseSchema: NewPaymentResponseSchema,
        payload: payload,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error creating new payment type:", sf.message);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async deleteType(id: string): Promise<DeletePaymentTypeResponse> {
    try {
      const res = await superFetch<
        undefined,
        DeletePaymentTypeResponse,
        "deleteOne"
      >({
        options: {
          method: "DELETE",
          includeCredentials: false, //TODO: Change this to work with tokens
        },
        route: "deleteOne",
        routeParams: [id],
        responseSchema: DeletePaymentTypeResponseSchema,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error deleting payment type:", sf.message);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }
}
