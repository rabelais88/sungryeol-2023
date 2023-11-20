import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import Link from 'next/link';

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const works = await reader.collections.works.all();
  return (
    <ul>
      {works.map((work) => (
        <li key={work.slug}>
          <Link href={`/works/${work.slug}`}>{work.entry.title}</Link>
        </li>
      ))}
    </ul>
  );
}
