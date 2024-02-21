interface AdminAuthLayoutProps {
  children: React.ReactNode
};

export default function AdminAuthLayout({ children }: AdminAuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="w-full">
        <div className="mx-4 md:mx-auto pt-8 px-4 pb-16 md:w-[460px] rounded-lg bg-white bg-opacity-90 md:bg-opacity-80">
          {children}
        </div>
      </div>
    </div>
  );
}