import Link from 'next/link';

import { Button } from '@nextui-org/react';

import type { Post } from '@prisma/client';
import paths from '@/utils/paths/admin';

import DeleteCategoryForm from '@/components/admin/forms/categories/delete';

interface PostListProps {
  fetchData: () => Promise<Post[]>;
};

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  if (!posts.length) {
    return (
      <div className="text-center">
        Looks like nobody created a post yet!<br />
        <Link href={paths.post('new')}>Be the first</Link>
      </div>
    );
  }

  const list = posts.map((item, x) => {
    let cls = 'border-t-0';
    const isFirst = x === 0;
    const isLast = x === posts.length - 1;
    if (isFirst || isLast) {
      cls = 'overflow-hidden';
      if (isFirst) {
        cls += ' rounded-t-lg';
      }
      if (isLast) {
        cls += ' rounded-b-lg';
        if (!isFirst) {
          cls += ' border-t-0';
        }
      }
    }
    return (
      <div key={item.id} className={`bg-white bg-opacity-50 border-2 border-sky-500 ${cls}`}>
        <div className="flex flex-col lg:flex-row px-2 lg:items-center">
          <div className="py-2 flex-grow">
            <Link href={paths.post(item.id)}>{item.title}</Link>
          </div>
          <div className="flex-grow lg:flex-initial pt-2 pb-4 lg:py-2">            
            <div className="flex gap-2">
              <div className="flex flex-auto lg:flex-initial">
                <Button
                  as={Link}
                  className="flex-grow"
                  href={paths.post('new')}
                >
                  View
                </Button>
              </div>
              <div className="flex flex-auto lg:flex-initial">
                <Button
                  as={Link}
                  className="flex-grow"
                  color="primary"
                  href={paths.post('new')}
                >
                  Edit
                </Button>
              </div>
              <div className="flex-auto lg:flex-initial">
                <DeleteCategoryForm id={item.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col">
      <Button
        as={Link}
        className="ml-auto mb-4"
        href={paths.post('new')}
        color="primary"
        variant="ghost"
      >
        Add new post
      </Button>
      {list}
    </div>
  );
}