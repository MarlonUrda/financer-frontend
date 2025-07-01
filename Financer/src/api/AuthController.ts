import { superFetch } from "./superfetch/superfetch";
import { SuperFetchError } from "./superfetch/types";
import {
  type ChangePasswordRequest,
  type ChangePasswordResponse,
  ChangePasswordResponseSchema,
  type LoginRequest,
  LoginResponseSchema,
  type LoginResponse,
  type RegisterRequest,
  RegisterResponseSchema,
  type RegisterResponse,
  type VerifyCodeRequest,
  type VerifyCodeResponse,
  VerifyCodeResponseSchema,
  type VerifyEmailRequest,
  type VerifyEmailResponse,
  VerifyEmailResponseSchema,
} from "../types/AuthSchema";

export default class AuthController {
  static async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const res = await superFetch<LoginRequest, LoginResponse, "login">({
        options: {
          method: "POST",
        },
        route: "login",
        responseSchema: LoginResponseSchema,
        payload: payload,
      });

      console.log(res);

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error en la solicitud:", sf.message);
      console.log("Código de error:", sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async register(payload: RegisterRequest): Promise<RegisterResponse> {
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

      console.log(res);

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error en la solicitud:", sf.message);
      console.log("Código de error:", sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async SendEmail(
    payload: VerifyEmailRequest
  ): Promise<VerifyEmailResponse> {
    try {
      const res = await superFetch<
        VerifyEmailRequest,
        VerifyEmailResponse,
        "sendEmail"
      >({
        options: {
          method: "POST",
        },
        route: "sendEmail",
        responseSchema: VerifyEmailResponseSchema,
        payload: payload,
      });

      console.log(res);

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error en la solicitud:", sf.message);
      console.log("Código de error:", sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async VerifyCode(
    payload: VerifyCodeRequest
  ): Promise<VerifyCodeResponse> {
    try {
      const res = await superFetch<
        VerifyCodeRequest,
        VerifyCodeResponse,
        "verify"
      >({
        options: {
          method: "POST",
        },
        route: "verify",
        responseSchema: VerifyCodeResponseSchema,
        payload: payload,
      });

      console.log(res);

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error en la solicitud:", sf.message);
      console.log("Código de error:", sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }

  static async ChangePassword(
    payload: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    try {
      const res = await superFetch<
        ChangePasswordRequest,
        ChangePasswordResponse,
        "changePassword"
      >({
        options: {
          method: "POST",
        },
        route: "changePassword",
        responseSchema: ChangePasswordResponseSchema,
        payload: payload,
      });

      console.log(res);

      return res;
    } catch (error) {
      const sf = error as SuperFetchError;
      console.log("Error en la solicitud:", sf.message);
      console.log("Código de error:", sf.code);
      throw new SuperFetchError(sf.message, sf.code);
    }
  }
}
