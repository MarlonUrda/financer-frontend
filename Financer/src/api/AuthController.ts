import { superFetch } from "./superfetch/superfetch";
import { SuperFetchError } from "./superfetch/types";
import {
  type LoginRequest,
  type LoginResponse,
  LoginResponseSchema,
  type RegisterRequest,
  type RegisterResponse,
  RegisterResponseSchema,
} from "../types/AuthSchema";

export default class AuthController {
  static async login(payload: LoginRequest) {
    try {
      const res = await superFetch<LoginRequest, LoginResponse, "login">({
        options: {
          method: "POST",
        },
        route: "login",
        responseSchema: LoginResponseSchema,
        payload: payload,
      });

      return res
    } catch (error) {
      if (error instanceof SuperFetchError) {
        console.log("Error en la solicitud:", error.message);
      } else {
        console.log("Error inesperado:", error);
      }
    }
  }

  static async register(payload: RegisterRequest) {
    try {
      const res = await superFetch<
        RegisterRequest,
        RegisterResponse,
        "register"
      >({
        options: {
          method: "POST",
        },
        route: "register",
        responseSchema: RegisterResponseSchema,
        payload: payload,
      });

      return res
    } catch (error) {
      if (error instanceof SuperFetchError) {
        console.log("Error en la solicitud:", error.message);
      } else {
        console.log("Error inesperado:", error);
      }
    }
  }
}
