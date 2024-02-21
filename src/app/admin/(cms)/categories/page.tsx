import CategoryList from '@/components/admin/lists/categories';

import { fetchAllCategories } from '@/db/queries/admin/categories';

export default function AdminCategoriesListpage() {
  return (
    <div className="relative">
      <div className="md:col-span-3 flex flex-col gap-4">
        <h1 className="mb-4 text-xl text-white">Manage categories</h1>        
        <CategoryList fetchData={fetchAllCategories} />
      </div>
    </div>
  );
}