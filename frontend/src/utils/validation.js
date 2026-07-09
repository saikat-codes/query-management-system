import { z } from 'zod';

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email structure (e.g., tony@stark.com)." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
  name: z.string().optional()
});

export const querySchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters." }),
  message: z.string().trim().min(6, { message: "Message must be at least 6 characters long." })
});
