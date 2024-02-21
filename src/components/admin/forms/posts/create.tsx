'use client';

import { useFormState } from "react-dom";

import Link from "next/link";

import {
  Input,
  Textarea,
  Button,
} from '@nextui-org/react';

import * as actions from '@/actions';
import paths from "@/utils/paths/admin";

export default function AdminPostCreateForm() {
  const [formState, action] = useFormState(actions.createPost, {
    errors: {},
  });
  return (
    <form
      action={action}
      className="flex flex-col gap-4"
    >
      <Input
        name="title"
        label="Title"
        labelPlacement="inside"
        placeholder="Insert the post title"
        classNames={{
          inputWrapper: [
            'border',
            'border-sky-500',
            'hover:border-sky-700',
            'rounded-medium',
            "!cursor-text",
          ],
        }}
        isInvalid={!!formState.errors.title}
        errorMessage={!!formState.errors.title ? <><ul className="list-disc px-5">{formState.errors.title.map(err => <li key={err}>{err}</li>)}</ul></> : null}
      />
      <Textarea
        name="description"
        label="Description"
        labelPlacement="inside"
        placeholder="Add the post description"
        className="border border-sky-500 hover:border-sky-900 rounded-medium"
        isInvalid={!!formState.errors.description}
        errorMessage={!!formState.errors.description ? <><ul className="list-disc px-5">{formState.errors.description.map(err => <li key={err}>{err}</li>)}</ul></> : null}
      />
      <Textarea
        name="content"
        label="Content"
        labelPlacement="inside"
        placeholder="Add the post content"
        className="border border-sky-500 hover:border-sky-900 rounded-medium"
        minRows={10}
        maxRows={50}
        isInvalid={!!formState.errors.description}
        errorMessage={!!formState.errors.description ? <><ul className="list-disc px-5">{formState.errors.description.map(err => <li key={err}>{err}</li>)}</ul></> : null}
      />
      {formState.errors._generic ? (
        <div className="p-2 bg-red-100 border border-red-400 rounded text-red-600">
          <ul className={formState.errors._generic.length > 1 ? 'list-disc' : ''}>{formState.errors._generic.map(err => <li key={err}>{err}</li>)}</ul>
        </div>
      ) : null}
      <div className="flex gap-2 lg:gap-0 lg:justify-between">
        <Link className="flex items-center justify-center min-w-[124px] text-slate-500 border border-slate-400 rounded-xl" href={paths.categories()}>
          Discard
        </Link>        
        <Button className="grow lg:grow-0 lg:min-w-[256px]" color="primary" type="submit">
          CREATE
        </Button>
      </div>
    </form>
  );
}