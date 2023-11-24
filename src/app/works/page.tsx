import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import Link from 'next/link';
import LayoutBase from '@/components/shared/LayoutBase';
import PrettyLink from '@/components/shared/PrettyLink';

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const works = await reader.collections.works.all();
  return (
    <LayoutBase pageName="works">
      <h1 className="font-head text-3xl">WORKS</h1>
      <ul>
        {works.map((work) => (
          <li key={work.slug}>
            <PrettyLink href={`/works/${work.slug}`}>
              {work.entry.title} - {work.entry.titleKr}
            </PrettyLink>
          </li>
        ))}
      </ul>
    </LayoutBase>
  );
}
