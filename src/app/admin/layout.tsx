import Curve from "@/components/admin/layout/curve";
import museoClassName from "@/components/admin/layout/fonts";

interface AdminRootLayoutProps {
  children: React.ReactNode
};

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <div className={`${museoClassName} bg-sky-100 min-h-screen`}>
      <Curve />
      {children}
    </div>
  );
}
