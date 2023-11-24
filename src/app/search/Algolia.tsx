'use client';

import PrettyLink from '@/components/shared/PrettyLink';
import { formatDate, joinClass } from '@/utils';
import {
  useAlgoliaSearch,
  useAlgoliaSearchControl,
  useAlgoliaSearchTags,
} from '@/utils/algolia';
import SearchBox from './SearchBox';
import { useMemo } from 'react';
import Tag from '@/components/shared/Tag';

const Pagination: React.FC<{
  searchResults: ReturnType<typeof useAlgoliaSearch>['searchResult'];
}> = ({ searchResults }) => {
  const pages = Array.from({ length: searchResults?.nbPages ?? 0 }).map(
    (_, i) => i
  );
  const { page, getPageUrl } = useAlgoliaSearchControl();
  return (
    <div className="flex flex-wrap gap-2">
      {pages.map((i) => (
        <PrettyLink
          className="text-center w-[72px]"
          href={getPageUrl(i)}
          disabled={i === page}
          key={i}
        >
          {(i + 1).toString()}
        </PrettyLink>
      ))}
    </div>
  );
};

const Algolia = ({ tags }: { tags: { label: string; value: string }[] }) => {
  const tagsMap = useMemo(
    () =>
      tags.reduce(
        (ac, cv) => ({ ...ac, [cv.value]: cv.label }),
        {} as Record<string, string>
      ),
    [tags]
  );
  const search = useAlgoliaSearch();
  const { tagsSearchResult } = useAlgoliaSearchTags();
  const { activeTagsMap } = useAlgoliaSearchControl();
  const hits = search.searchResult?.hits ?? [];
  const tagsHits = tagsSearchResult?.facetHits ?? [];
  console.log(hits);
  return (
    <div className="flex flex-col gap-5">
      <SearchBox />
      <div className="flex flex-wrap gap-2">
        {tagsHits.map((hit) => (
          <a
            key={hit.value}
            href={
              activeTagsMap[hit.value] ? `/search` : `/search?tags=${hit.value}`
            }
          >
            <Tag active={activeTagsMap[hit.value]}>
              #{tagsMap[hit.value] ?? hit.value}
            </Tag>
          </a>
        ))}
      </div>
      {search.loading && <p>LOADING</p>}
      {!search.loading && hits.length === 0 && <p>no result</p>}
      {!search.loading && (
        <ul className="flex flex-col gap-3">
          {hits.map((hit) => (
            <li key={hit.objectID}>
              {hit.type == 'post' && (
                <>
                  <PrettyLink href={`/posts/${hit.slug}`}>
                    {hit.title}
                  </PrettyLink>
                  <p>{formatDate(hit.publishedAt, 'YYYY-MMM-DD')}</p>
                  <div className="flex flex-wrap gap-1">
                    {hit.tags.map((tagId) => (
                      <Tag key={tagId}>#{tagsMap[tagId] ?? tagId}</Tag>
                    ))}
                  </div>
                </>
              )}
              {hit.type == 'work' && (
                <>
                  <a href={`/works/${hit.slug}`}>{hit.title}</a>
                  {hit.publishedAtType === 'year' && (
                    <p>{formatDate(hit.publishedAt, 'YYYY')}</p>
                  )}
                  {hit.publishedAtType === 'year-month' && (
                    <p>{formatDate(hit.publishedAt, 'YYYY-MM')}</p>
                  )}
                </>
              )}
              {hit.type === 'contact' && <a href="contact">contact</a>}
              {hit?._snippetResult?.body?.matchLevel !== 'none' && (
                <div
                  className={joinClass(
                    '[&_em]:bg-yellow-base dark:[&_em]:bg-pink-base'
                  )}
                  dangerouslySetInnerHTML={{
                    __html: hit?._snippetResult?.body.value ?? '',
                  }}
                ></div>
              )}
            </li>
          ))}
        </ul>
      )}
      <Pagination searchResults={search.searchResult} />
    </div>
  );
};

export default Algolia;
