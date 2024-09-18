import z from "zod";

const requiredString = z.string().trim();

export const signUpSchema = z.object({
  email: requiredString
    .min(1, "Please an email is required")
    .describe("Email for signing up")
    .email(),
  username: requiredString
    .min(1, "You need a username")
    .describe("User name for the user.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ are allowed"),
  password: requiredString
    .min(8, "Password must be at least 8 characters")
    .describe("Password for the user."),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString
    .min(1, "Please input your username that you registered with."),
  password: requiredString
    .min(1, "Password is required to login")
    .describe("Password that you registered with."),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString.min(
    1,
    "Content for the post is required",
  ),
  });

