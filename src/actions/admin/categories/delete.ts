'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/db/connect/prisma';
import paths from '@/utils/paths/admin';

interface DeleteCategoryByIdFormState {
  errors: {
    _generic?: string[],
  }
};

export async function deleteCategoryById(
  id: string,
  formState: DeleteCategoryByIdFormState,
) {
  try {
    await db.category.delete({
      where: {
        id,
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
        _generic: ['Something totally unexpected just happened.'],
      },
    };
  }

  revalidatePath(paths.categories());
  return {
    errors: {},
  };
};
