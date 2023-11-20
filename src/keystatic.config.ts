import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'slug',
      path: '/src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.text({ label: 'slug' }),
        visible: fields.checkbox({ label: 'visible', defaultValue: true }),
        publishedAt: fields.datetime({ label: 'Published Time' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: { isRequired: true },
          }),
          {
            label: 'Tag',
            itemLabel: (props) => props.value ?? 'select a tag',
          }
        ),
      },
    }),
    tags: collection({
      label: 'Tags',
      slugField: 'value',
      path: '/src/content/tags/*',
      schema: {
        label: fields.text({ label: 'Label' }),
        value: fields.text({ label: 'Value' }),
      },
    }),
    works: collection({
      label: 'Works',
      slugField: 'slug',
      path: '/src/content/works/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.text({ label: 'Slug' }),
        visible: fields.checkbox({ label: 'visible', defaultValue: true }),
        publishedAt: fields.date({ label: 'Published Date' }),
        publishedAtType: fields.select({
          label: 'Published Date Type',
          options: [
            { label: 'No Disclose', value: 'no-disclose' },
            { label: 'Year, Month', value: 'year-month' },
            { label: 'Year Only', value: 'year' },
          ],
          defaultValue: 'year-month',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
        urls: fields.array(
          fields.url({ label: 'URL', validation: { isRequired: true } }),
          { label: 'URLs', itemLabel: (props) => props.value ?? 'empty url' }
        ),
      },
    }),
  },
  singletons: {
    contact: collection({
      label: 'Contact',
      // @ts-ignore
      path: '/src/content/contact',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
        urls: fields.array(
          fields.url({ label: 'URL', validation: { isRequired: true } }),
          {
            label: 'URLs',
            itemLabel: (props) => props.value ?? 'empty url',
          }
        ),
      },
    }),
  },
});
