import { z } from 'zod';

export const QueryUsersSchema = z
  .object({
    q: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  })
  .strict();

export type QueryUsersDto = z.infer<typeof QueryUsersSchema>;
