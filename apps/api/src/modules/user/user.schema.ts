import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;
const objectId = z
  .string({ message: "ID is required" })
  .regex(objectIdRegex, "Invalid ID format");

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(30, "Username must be at most 30 characters")
      .trim()
      .optional(),

    bio: z
      .string()
      .max(160, "Bio must be at most 160 characters")
      .trim()
      .optional(),

    avatar: z.string().url("Avatar must be a valid URL").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const searchUsersQuerySchema = z.object({
  q: z
    .string({ message: "Search query is required" })
    .min(1, "Search query cannot be empty")
    .max(50)
    .trim(),

  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, "Page must be greater than 0"),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val <= 20, "Limit must be at most 20"),
});

export const userParamsSchema = z.object({
  userId: objectId,
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
export type SearchUsersQueryDto = z.infer<typeof searchUsersQuerySchema>;
