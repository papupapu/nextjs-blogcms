'use server';

import * as auth from '@/auth';
import paths from '@/utils/paths/admin';

export async function signIn(provider: string) {
  return auth.signIn(provider, { redirectTo: paths.home() });
}
