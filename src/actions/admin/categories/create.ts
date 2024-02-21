'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/db/connect/prisma';
import paths from '@/utils/paths/admin';
import slugify from '@/utils/slugify';

const categorySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
});

interface CreateCategoryFormState {
  errors: {
    title?: string[],
    description?: string[],
    _generic?: string[],
  },
};

export async function createCategory(
  formState: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> {
  const result = categorySchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.category.create({
      data: {
        title: result.data.title,
        slug: slugify(result.data.title),
        description: result.data.description,
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

  revalidatePath(paths.categories());
  redirect(paths.categories());
}