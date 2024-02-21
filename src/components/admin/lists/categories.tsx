import Link from 'next/link';

import { Button } from '@nextui-org/react';

import type { Category } from '@prisma/client';
import paths from '@/utils/paths/admin';

import DeleteCategoryForm from '@/components/admin/forms/categories/delete';

interface CategoryListProps {
  fetchData: () => Promise<Category[]>;
};

export default async function CategoryList({ fetchData }: CategoryListProps) {
  const categories = await fetchData();

  if (!categories.length) {
    return (
      <div className="text-center">
        Looks like nobody created a category yet!<br />
        <Link href={paths.category('new')}>Be the first</Link>
      </div>
    );
  }

  const list = categories.map((item, x) => {
    let cls = 'border-t-0';
    const isFirst = x === 0;
    const isLast = x === categories.length - 1;
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
            <Link href={paths.category(item.id)}>{item.title}</Link>
          </div>
          <div className="flex-grow lg:flex-initial pt-2 pb-4 lg:py-2">            
            <div className="flex gap-2">
              <div className="flex flex-auto lg:flex-initial">
                <Button
                  as={Link}
                  className="flex-grow"
                  href={paths.category('new')}
                >
                  View
                </Button>
              </div>
              <div className="flex flex-auto lg:flex-initial">
                <Button
                  as={Link}
                  className="flex-grow"
                  color="primary"
                  href={paths.category('new')}
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
        href={paths.category('new')}
        color="primary"
        variant="ghost"
      >
        Add new category
      </Button>
      {list}
    </div>
  );
}