import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import Link from 'next/link';
import LayoutBase from '@/components/shared/LayoutBase';
import HeadlineItem from '../HeadlineItem';

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const posts = await reader.collections.posts.all();
  return (
    <LayoutBase pageName="posts">
      <ul>
        {posts.map((post) => (
          <HeadlineItem
            key={post.slug}
            title={post.entry.title}
            publishedAt={post.entry.publishedAt ?? ''}
            href={`/posts/${post.slug}`}
          />
          // <li key={post.slug}>
          //   <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
          // </li>
        ))}
      </ul>
    </LayoutBase>
  );
}
