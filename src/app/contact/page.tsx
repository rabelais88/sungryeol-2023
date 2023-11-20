import { DocumentRenderer } from '@keystatic/core/renderer';

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

const getContact = () => reader.singletons.contact.read();

export async function generateMetadata() {
  return {
    title: 'contact',
  };
}

export default async function Post() {
  const contact = await getContact();
  if (!contact) return null;
  return (
    <>
      <DocumentRenderer document={await contact.content()} />
    </>
  );
}
