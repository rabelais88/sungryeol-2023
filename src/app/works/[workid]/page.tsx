import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import LayoutBase from '@/components/shared/LayoutBase';

const reader = createReader(process.cwd(), keystaticConfig);

type WorkPageProps = MyPageProps<['workid']>;

const getWork = (workid: string) => reader.collections.works.read(workid);
const getWorks = () => reader.collections.works.all();

export async function generateMetadata({ params: { workid } }: WorkPageProps) {
  const work = await getWork(workid);
  return {
    title: work?.title ?? 'untitled',
  };
}

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({ workid: work.slug }));
}

export default async function WorkPage({ params: { workid } }: WorkPageProps) {
  const work = await getWork(workid);
  if (!work) return null;
  return (
    <LayoutBase pageName="work">
      <h1>{work.title}</h1>
      <DocumentRenderer document={await work.content()} />
    </LayoutBase>
  );
}
