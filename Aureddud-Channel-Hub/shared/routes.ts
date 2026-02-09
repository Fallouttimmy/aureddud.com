import { z } from 'zod';
import { insertVideoSchema, videos } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  videos: {
    list: {
      method: 'GET' as const,
      path: '/api/videos' as const,
      responses: {
        200: z.array(z.custom<typeof videos.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/videos' as const,
      input: insertVideoSchema,
      responses: {
        201: z.custom<typeof videos.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type VideoInput = z.infer<typeof api.videos.create.input>;
export type VideoResponse = z.infer<typeof api.videos.list.responses[200]>[number];
