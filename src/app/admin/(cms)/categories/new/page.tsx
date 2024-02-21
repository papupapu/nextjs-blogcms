import Form from '@/components/admin/forms/categories/create';

export default function AdminCategoryCreatePage() {
  return (
    <div className="relative flex flex-col mx-auto">
      <h1 className="mb-4 text-xl">Create a new category</h1>
      <div className="p-4 bg-white bg-opacity-50 border border-slate-500 rounded-lg">
        <Form />
      </div>      
    </div>
  );
}
