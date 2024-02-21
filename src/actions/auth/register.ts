'use server';

import { redirect } from 'next/navigation';

import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { db } from '@/db/connect/prisma';

const registerFormSchema = z.object({
  email: z.string().email({ message: 'Please, provide a valid email address' }),
  password: z.string().min(8).max(30),
}).superRefine(({ email, password }, checkPassComplexity) => {
  if (email) {
    return;
  }

  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsNumber = (ch: string) => /[0-9]/.test(ch);
  const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

  let countUppercase = 0;
  let countLowercase = 0;
  let countNumber = 0;
  let countSpecialChar = 0;

  for (let i = 0; i < password.length; i += 1) {
    const ch = password.charAt(i);

    if (containsUppercase(ch)) {
      countUppercase += 1;
    } else if (containsLowercase(ch)) {
      countLowercase += 1;
    } else if (containsNumber(ch)) {
      countNumber += 1;
    } else if (containsSpecialChar(ch)) {
      countSpecialChar += 1;
    }
  }

  if (
    countUppercase > 1
    || countLowercase > 1
    || countNumber > 1
    || countSpecialChar > 1
  ) {
    checkPassComplexity.addIssue({
      path: ['password'],
      code: z.ZodIssueCode.custom,
      message: 'Password does not meet the complexity criteria required',
    });    
  }
});

interface RegisterFormState {
  errors: {
    email?: string[],
    password?: string[],
    _generic?: string[],
  },
};

export async function register(
  formState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {  
  const validationResult = registerFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validationResult.success) {    
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { data: { email, password } } = validationResult;

  const checkForExistingEmail = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (checkForExistingEmail) {
    return {
      errors: {
        email: ['Email already in use'],
      },
    };
  }

  const encryptedPassword = await bcrypt.hash(password, 5);

  try {
    await db.user.create({
      data: {
        name: '',
        email,
        emailVerified: null,
        password: encryptedPassword,
        image: '',
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

  redirect('/');
}
