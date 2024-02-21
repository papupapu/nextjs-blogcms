import AdminHeader from "@/components/admin/layout/header";

interface AdminCmsLayoutProps {
  children: React.ReactNode
};

export default async function AdminCmsLayout({ children }: AdminCmsLayoutProps) {
  return (
    <>
      <AdminHeader />
      <div className="mx-6 mt-6">
        {children}
      </div>
    </>
  );
}
