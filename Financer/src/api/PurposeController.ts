import {
  DeletePurposeResponseSchema,
  getAllPurposesResponseSchema,
  getSinglePurposeResponseSchema,
  NewPurposeResponseSchema,
  type AddPurposeRequest,
  type DeletePurposeResponse,
  type getAllPurposesResponse,
  type getSinglePurposeResponse,
  type NewPurposeResponse,
} from "../types/AdminSchemas/Purpose";
import { superFetch } from "./superfetch/superfetch";
import { SuperFetchError } from "./superfetch/types";

export default class PurposeController {
  static async getAllPurposes(): Promise<getAllPurposesResponse> {
    try {
      const res = await superFetch<
        undefined,
        getAllPurposesResponse,
        "getAllPurposes"
      >({
        options: {
          method: "GET",
        },
        route: "getAllPurposes",
        responseSchema: getAllPurposesResponseSchema,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log(sf.message, sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async getSinglePurpose(id: string): Promise<getSinglePurposeResponse> {
    try {
      const res = await superFetch<
        undefined,
        getSinglePurposeResponse,
        "getSinglePurpose"
      >({
        options: {
          method: "GET",
        },
        route: "getSinglePurpose",
        routeParams: [id],
        responseSchema: getSinglePurposeResponseSchema,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log(sf.message, sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async AddNewPurpose(
    payload: AddPurposeRequest
  ): Promise<NewPurposeResponse> {
    console.log(payload);

    try {
      const res = await superFetch<
        AddPurposeRequest,
        NewPurposeResponse,
        "addNewPurpose"
      >({
        options: {
          method: "POST",
          includeCredentials: false, //TODO: Change this when tokens implemented
        },
        route: "addNewPurpose",
        responseSchema: NewPurposeResponseSchema,
        payload: payload,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log(sf.message, sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async DeletePurpose(id: string): Promise<DeletePurposeResponse> {
    try {
      const res = await superFetch<
        undefined,
        DeletePurposeResponse,
        "deletePurpose"
      >({
        options: {
          method: "DELETE",
          includeCredentials: false, //TODO: Also change this when tokens are implemented succesfully
        },
        route: "deletePurpose",
        routeParams: [id],
        responseSchema: DeletePurposeResponseSchema,
      });

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log(sf.message, sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }
}
