import { number, z } from 'zod';
export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TParticipantSchema = z.infer<typeof ParticipantSchema>;

export const LoginSchema = z.object({
  email: z.string().email().max(30, "Email can't exceed 30 characters"),
  password: z.string().max(20, 'Password must be atleast 10 characters'),
});


export const ParticipantSchema = z.object({
  name: z.string().max(20, "Name cannot exceed 20 characters"),
  age: z.string().max(2, 'Age must be less than three digits'),
});


export const enum Credentials {
  AdminUsername = 'admin@gmail.com',
  PasswordUsername = 'admin123',
}
export const enum StorageKeys {
  loggedInUser = 'loggedInUser',
  email = 'email',
  password = 'password',
  name = 'name',
  age = 'age',
}

export const enum Routes {
  Home = '/cards',
  Success = '/success'
}
export const enum PaymentTypes {
  MONTHLY = 'monthlyPayment',
  QUARTERLY = 'quarterlyPayment',
}
