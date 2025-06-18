import { z } from "zod";

export interface LoginRequest {
  email: string;
  password: string;
}

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const LoginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().min(2).max(100),
  code: z.number(),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export interface RegisterRequest {
  email: string;
  fname: string;
  lname: string;
  phone: string;
  password: string;
  role_id: number;
}

export const RegisterResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().min(2).max(100),
  code: z.number(),
});

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

export type ChangePasswordResponse = z.infer<typeof ChangePasswordResponseSchema>;
