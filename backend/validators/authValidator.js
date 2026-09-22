import * as z from "zod";

export const registerSchema = z.strictObject({
    name: z.string().min(2).max(50),
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().min(8).max(72)
});

export const loginSchema = z.strictObject({
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().min(1)
});