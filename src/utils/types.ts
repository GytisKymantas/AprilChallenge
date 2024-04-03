import { z } from 'zod';
export type TLoginSchema = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
    email: z.string().email().max(30, "Email can't exceed 30 characters"),
    password: z.string().max(20, 'Password must be atleast 10 characters'),
  });
  