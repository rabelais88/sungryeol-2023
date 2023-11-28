import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

import LayoutBase from '@/components/shared/LayoutBase';
import HeadlineItem from '../HeadlineItem';
import Tag from '@/components/shared/Tag';

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const posts = await reader.collections.posts.all();
  const tags = await reader.collections.tags.all();

  const PostsTagIdMap: Record<string, boolean> = {};
  posts.forEach((post) => {
    (post.entry.tags ?? []).forEach((tagId) => {
      PostsTagIdMap[tagId] = true;
    });
  });
  const tagsLabelMap = tags.reduce(
    (ac, cv) => ({ ...ac, [cv.slug]: cv.entry.label }),
    {} as Record<string, string>
  );
  const postsTagId = Object.keys(PostsTagIdMap);

  return (
    <LayoutBase pageName="posts">
      <h1 className="font-head text-3xl">POSTS</h1>
      <div className="flex flex-wrap gap-1">
        {postsTagId.map((tagId) => (
          <a key={tagId} href={`/search?tags=${tagId}`}>
            <Tag key={tagId}>#{tagsLabelMap[tagId] ?? tagId}</Tag>
          </a>
        ))}
      </div>
      <ul className="[&>*]:mt-4">
        {posts.map((post) => (
          <HeadlineItem
            key={post.slug}
            title={post.entry.title}
            publishedAt={post.entry.publishedAt ?? ''}
            href={`/posts/${post.slug}`}
          />
        ))}
      </ul>
    </LayoutBase>
  );
}
