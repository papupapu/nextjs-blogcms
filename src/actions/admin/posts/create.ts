'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from "@/db/connect/prisma";
import paths from '@/utils/paths/admin';
import slugify from '@/utils/slugify';

const postFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  content: z.string().min(10),
  categoryId: z.string().min(1),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    description?: string[];
    content?: string[];
    categoryId?: string[];
    _generic?: string[]; 
  }
};

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> {
  const result = postFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    content: formData.get('content'),
    categoryId: formData.get('categoryId'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.post.create({
      data: {
        title: result.data.title,
        slug: slugify(result.data.title),
        description: result.data.description,
        content: result.data.content,
        categoryId: result.data.categoryId,
        tagIDs: [],
        userId: 'aaa',
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _generic: [error.message],
        },
      };
    }
    return {
      errors: {
        _generic: ['Something totally unespected happened :('],
      },
    };
  }

  revalidatePath(paths.posts());
  redirect(paths.posts());
}