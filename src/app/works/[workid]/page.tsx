import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

type WorkPageProps = MyPageProps<['workid']>;

const getWork = (workid: string) => reader.collections.posts.read(workid);

export async function generateMetadata({ params: { workid } }: WorkPageProps) {
  const work = await getWork(workid);
  return {
    title: work?.title ?? 'untitled',
  };
}

export default async function WorkPage({ params: { workid } }: WorkPageProps) {
  const work = await getWork(workid);
  if (!work) return null;
  return (
    <>
      <h1>{work.title}</h1>
      <DocumentRenderer document={await work.content()} />
    </>
  );
}
