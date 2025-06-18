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
