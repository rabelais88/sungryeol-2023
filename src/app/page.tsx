// import Image from 'next/image';

import IconLogoGeometry from '@/components/icons/IconLogoGeometry';
import PrettyLink from '@/components/shared/PrettyLink';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <p className="text-xl">박성렬 블로그 & 포트폴리오</p>
      <IconLogoGeometry />
      <PrettyLink href="/">test link</PrettyLink>
    </main>
  );
}
