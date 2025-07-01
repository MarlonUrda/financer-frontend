import { z } from "zod";

export interface User {
  id: number;
  email: string;
  fname: string;
  lname: string;
  phone: string;
  created_at: string
  role_id: number;
}

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  fname: z.string().min(2).max(100),
  lname: z.string().min(2).max(100),
  phone: z.string().min(10).max(15),
  created_at: z.string(),
  role_id: z.number(),
});
