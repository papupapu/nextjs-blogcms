import type { Category } from '@prisma/client';

import { db } from '@/db/connect/prisma';

export async function fetchAllCategories(): Promise<Category[]> {
  return await db.category.findMany({
    orderBy: [{
      createdAt: 'desc',
    }],
  });
};
