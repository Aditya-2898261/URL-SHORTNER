import * as z from "zod";

export const createUrlSchema = z.strictObject({
   originalUrl: z.url()
});

export const deleteUrlSchema = z.strictObject({
    urlId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid URL id")
});

export const redirectSchema = z.strictObject({
    shortCode: z.string().min(1).max(50)
});