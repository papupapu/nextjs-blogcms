'use client';

import { useRouter } from 'next/navigation';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
