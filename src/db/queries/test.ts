import type { User, Post } from '@prisma/client';

import { db } from '@/db/connect/prisma';

export function fetchAllUsers(): Promise<User[]> {
  return db.user.findMany();
};

export function fetchPostUsers(): Promise<Post[]> {
  return db.post.findMany();
};
