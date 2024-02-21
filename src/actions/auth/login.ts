'use server';

import { redirect } from 'next/navigation';

import { z } from 'zod';

import { signIn } from '@/auth';
import paths from '@/utils/paths/admin';

const loginFormSchema = z.object({
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

interface loginFormState {
  errors: {
    email?: string[],
    password?: string[],
    _generic?: string[],
  },
};

export async function login(
  formState: loginFormState,
  formData: FormData
): Promise<loginFormState> {  
  const validationResult = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validationResult.success) {    
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { data: { email, password } } = validationResult;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {      
      return {
        errors: {
          _generic: ['We were not able to log you in. Please, check the credetial you provided.'],
        },
      };
    }
    return {
      errors: {
        _generic: ['Something totally unespected happened :('],
      },
    };
  }

  redirect(paths.home());
}
