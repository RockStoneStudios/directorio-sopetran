// components/layout/radio-player-wrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import FloatingRadioPlayer from '@/components/footer/floating-radio-player';

export default function RadioPlayerWrapper() {
  const pathname = usePathname();
  
  // Mostrar solo en la página principal
  const isHomePage = pathname === '/';
  
  if (!isHomePage) return null;
  
  return <FloatingRadioPlayer />;
}