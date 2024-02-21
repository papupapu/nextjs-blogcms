import Form from '@/components/admin/forms/login';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-medium text-center">
        Welcome to your CMS
      </h1>
      <p className="text-s font-thin text-center">
        Insert your credentials to log in
      </p>
      <Form />
    </div>
  );
}