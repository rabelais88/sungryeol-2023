import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import Link from 'next/link';
import LayoutBase from '@/components/shared/LayoutBase';
import { getDiff } from '@/utils';
import dayjs from 'dayjs';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const posts = (await reader.collections.posts.all()).sort((pa, pb) =>
    getDiff(pb.entry.publishedAt, pa.entry.publishedAt)
  );
  return (
    <LayoutBase pageName="posts">
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
            {dayjs(post.entry.publishedAt).format('YYYY-MM-DD HH:MM')}
          </li>
        ))}
      </ul>
    </LayoutBase>
  );
}
