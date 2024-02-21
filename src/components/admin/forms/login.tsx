'use client';

import { useFormState } from 'react-dom';

import {
  Input,
  Button,
  Link,
} from '@nextui-org/react';

import * as actions from '@/actions';

export default function LoginForm() {
  const [formState, action] = useFormState(actions.login, {
    errors: {}
  });

  const signInWithGithub = () => actions.signIn('github');

  return (
    <>
    <form action={action} className="flex flex-col gap-3 mb-4">
      <Input
        name="email"
        label="Insert your email address"
        placeholder="Email address"
        color="default"
        classNames={{
          label: 'font-thin',
          inputWrapper: [
            'bg-transparent',
            'border',
            'border-slate-500',
            'hover:border-slate-800',
          ],
        }}
        isInvalid={!!formState.errors.email}
        errorMessage={!!formState.errors.email ? <><ul className="px-2">{formState.errors.email.map(err => <li key={err}>{err}</li>)}</ul></> : null}
      />
      <Input
        type="password"
        name="password"
        label="Insert your password"
        placeholder="Password"
        classNames={{
          label: 'font-thin',
          inputWrapper: [
            'bg-transparent',
            'border',
            'border-slate-500',
            'hover:border-slate-800',
          ],
        }}
        isInvalid={!!formState.errors.password}
        errorMessage={!!formState.errors.password ? <><ul className="px-2">{formState.errors.password.map(err => <li key={err}>{err}</li>)}</ul></> : null}
      />
      {formState.errors._generic ? (
        <div className="p-2 bg-red-100 border border-red-400 rounded text-red-600">
          <ul className="text-tiny">{formState.errors._generic.map(err => <li key={err}>{err}</li>)}</ul>
        </div>
      ) : null}      
      <Button
        className="w-[50%] mx-auto"
        color="primary"
        type="submit"
      >
        Login
      </Button>
    </form>
    <p className="text-s font-thin text-center">
      If you don&apos;t have an account yet, you can create one
    </p>
    <Button
      as={Link}
      href="/admin/auth/register"
      className="w-[50%] mx-auto mb-4"
      color="secondary"
    >
      Register
    </Button>
    <p className="text-s font-thin text-center">
      or just log in with your
    </p>
    <form action={signInWithGithub} className="flex flex-col">
      <Button
        className="w-[50%] mx-auto"
        color="primary"
        variant="ghost"
        type="submit"
      >
        Github account
      </Button>
    </form>
    </>
  );
}