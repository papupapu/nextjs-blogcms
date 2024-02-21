'use client';

import { useFormState } from 'react-dom';

import { Button } from '@nextui-org/react';

import * as actions from '@/actions';

interface AdminDeleteCategoryFormProps {
  id: string;
};

export default function AdminDeleteCategoryForm({ id }: AdminDeleteCategoryFormProps) {
  const [formState, action] = useFormState(actions.deleteCategoryById.bind(null, id), {
    errors: {},
  });
  return (
    <form className="flex" action={action}>
      <Button className="flex-grow" type="submit" color="warning">
        Delete
      </Button>
      {formState.errors._generic ? (
        <div className="p-2 bg-red-100 border border-red-400 rounded text-red-600">
          <ul className={formState.errors._generic.length > 1 ? 'list-disc' : ''}>{formState.errors._generic.map(err => <li key={err}>{err}</li>)}</ul>
        </div>
      ) : null}
    </form>
  );
}
