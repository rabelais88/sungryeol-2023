import type { Metadata } from 'next';
import './globals.css';
import {
  fontHammersmithOne,
  fontPretendard,
  fontTungkeun,
} from '@/styles/font';
import { joinClass } from '@/utils';
import NavTop from '@/components/NavTop';
import NavLeft from '@/components/NavLeft';

export const metadata: Metadata = {
  title: '성렬:Sungryeol',
  description: 'Blog of Sungryeol',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={joinClass(
          fontTungkeun.variable,
          fontHammersmithOne.variable,
          fontPretendard.variable,
          'font-sans'
        )}
      >
        <NavTop />
        <NavLeft />
        <div className="h-nav-top" />
        {children}
      </body>
    </html>
  );
}
