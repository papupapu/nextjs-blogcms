import Form from '@/components/admin/forms/register';

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-medium text-center">
        Welcome to your CMS
      </h1>
      <p className="text-s font-thin text-center">
        Create you account and get started!
      </p>
      <Form />
    </div>    
  );
}