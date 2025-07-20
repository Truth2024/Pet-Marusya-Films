import { z } from 'zod';
const nameSchema = z
  .string()
  .min(2, { message: 'Минимум 2 буквы' })
  .max(30, { message: 'Максимум 30 букв' })
  .regex(/^[A-Za-zА-Яа-яЁё -]+$/, {
    message: 'Допустимы только буквы, пробелы и дефисы',
  })
  .trim();

export const authSchema = z.object({
  email: z.string().email({ message: 'Невалидный email' }),
  password: z.string().min(8, { message: 'Минимум 8 символов' }),
});

export const regSchema = authSchema
  .extend({
    name: nameSchema,
    surname: nameSchema,
    acceptPassword: z.string(),
  })
  .refine((data) => data.password === data.acceptPassword, {
    message: 'Пароли не совпадают',
    path: ['acceptPassword'],
  });

export type Mode = 'auth' | 'reg';

export type AuthFormFields = z.infer<typeof authSchema>;
export type RegFormFields = z.infer<typeof regSchema>;
