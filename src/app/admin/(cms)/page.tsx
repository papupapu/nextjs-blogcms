import {
  Button,
} from '@nextui-org/react';

import * as actions from '@/actions';
import { fetchPostUsers } from '@/db/queries/test';

export default async function AdminHomePage() {
  const posts = await fetchPostUsers();
  return (
    <div className="relative">
      <p className="text-white">Posts: {posts.length}</p>
      <form action={actions.signOut}>
        <Button type="submit">
          Signout
        </Button>
      </form>
    </div>
  );
}