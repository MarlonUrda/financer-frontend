import { z } from "zod";
import { UserSchema } from "./User";

export interface LoginRequest {
  email: string;
  password: string;
}

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const LoginSuccessResponseSchema = z.object({
  token: z.string(),
  success: z.boolean(),
  message: z.string().min(2).max(100),
});

export type LoginSuccessResponse = z.infer<typeof LoginSuccessResponseSchema>;

export const LoginErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type LoginErrorResponse = z.infer<typeof LoginErrorResponseSchema>;

export const LoginResponseSchema = z.union([
  LoginSuccessResponseSchema,
  LoginErrorResponseSchema,
]);

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export interface RegisterRequest {
  email: string;
  fname: string;
  lname: string;
  phone: string;
  password: string;
  created_at: string;
  role_id: number;
}

export const RegisterSuccessResponseSchema = z.object({
  success: z.boolean(),
  user: UserSchema,
  message: z.string().min(2).max(100),
});

export type RegisterSuccessResponse = z.infer<
  typeof RegisterSuccessResponseSchema
>;

export const RegisterErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().min(2).max(100),
});

export type RegisterErrorResponse = z.infer<typeof RegisterErrorResponseSchema>;

export const RegisterResponseSchema = z.union([
  RegisterSuccessResponseSchema,
  RegisterErrorResponseSchema,
]);

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export interface SendEmailRequest {
  email: string;
}

export const SendEmailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().min(2).max(100),
  code: z.number(),
});

export type SendEmailResponse = z.infer<typeof SendEmailResponseSchema>;

export interface VerifyEmailRequest {
  email: string;
}

export const VerifyEmailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().min(2).max(100),
  code: z.number(),
});

export type VerifyEmailResponse = z.infer<typeof VerifyEmailResponseSchema>;

export interface VerifyCodeRequest {
  code: string;
  email: string;
}

export const VerifyCodeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().min(2).max(100),
  code: z.number(),
});

export type VerifyCodeResponse = z.infer<typeof VerifyCodeResponseSchema>;

export interface ChangePasswordRequest {
  new_password: string;
  email: string;
}

export const ChangePasswordResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().min(2).max(100),
  code: z.number(),
});

export type ChangePasswordResponse = z.infer<
  typeof ChangePasswordResponseSchema
>;
