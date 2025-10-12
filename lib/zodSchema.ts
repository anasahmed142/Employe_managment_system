import { z } from "zod";

export const zodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3, "Password must be at least 6 characters"),
});