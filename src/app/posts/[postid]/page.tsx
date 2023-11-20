import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import ButtonOutline from '@/components/shared/ButtonOutline';
import IconShare from '@/components/icons/IconShare';
import Tag from '@/components/shared/Tag';
import { formatDate, joinClass } from '@/utils';
import Divider from '@/components/shared/Divider';

const reader = createReader(process.cwd(), keystaticConfig);

type PostPageProps = MyPageProps<['postid']>;

const getPost = (postid: string) => reader.collections.posts.read(postid);
const getTag = (tagId: string) => reader.collections.tags.read(tagId);

export async function generateMetadata({ params: { postid } }: PostPageProps) {
  const post = await getPost(postid);
  return {
    title: post?.title ?? 'untitled',
  };
}

const TagFromId = async ({ tagId }: { tagId: string }) => {
  const tag = await getTag(tagId);
  if (!tag) return <Tag>#{tagId}</Tag>;
  return <Tag>#{tag?.label}</Tag>;
};

export default async function Post({ params: { postid } }: PostPageProps) {
  const post = await getPost(postid);
  if (!post) return null;
  return (
    <div data-comp="post-page">
      <ButtonOutline className="mb-[30px] gap-4">
        <IconShare />
        Share
      </ButtonOutline>
      <div>
        {post.tags.map((tag) => (
          <TagFromId key={tag} tagId={tag} />
        ))}
      </div>
      <p className="font-sans font-light">
        {formatDate(post.publishedAt, 'YYYY.MMM.DD')}
      </p>
      <h1 className="font-head font-bold text-3xl">{post.title}</h1>
      <Divider />
      <div
        className={joinClass(
          '[&_p]:text-base [&_p]:mt-[50px]',
          '[&_h1]:font-head [&_h2]:font-head [&_h3]:font-head [&_h4]:font-head',
          '[&>*+*]:mt-[40px]'
        )}
      >
        <DocumentRenderer
          document={await post.content()}
          // componentBlocks={markdownComponents}
        />
      </div>
    </div>
  );
}
