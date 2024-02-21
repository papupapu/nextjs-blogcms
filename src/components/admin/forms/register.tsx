'use client';

import { useFormState } from 'react-dom';

import {
  Input,
  Button,
  Link,
} from '@nextui-org/react';

import * as actions from '@/actions';

export default function RegistrationForm() {
  const [formState, action] = useFormState(actions.register, {
    errors: {}
  });

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
          Register
        </Button>
      </form>
      <p className="text-s font-thin text-center">
        Already have an account? Just log in then
      </p>
      <Button
        as={Link}
        href="/admin/auth/login"
        className="w-[50%] mx-auto mb-4"
        color="secondary"
      >
        Login
      </Button>
    </>
  );
}