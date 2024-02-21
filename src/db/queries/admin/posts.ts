import type { Post } from '@prisma/client';

import { db } from "@/db/connect/prisma";

export async function fetchAllPosts(): Promise<Post[]> {
  return await db.post.findMany({
    orderBy: [{
      createdAt: 'desc',
    }],    
  });
}