'use client';
import { useAlgoliaSearchControl } from '@/utils/algolia';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'radash';
import { joinClass } from '@/utils';

const SearchBox = () => {
  const { q, setKeyword } = useAlgoliaSearchControl();
  const debouncedSetKeyword = useMemo(
    () => debounce({ delay: 300 }, setKeyword),
    []
  );
  const [internalKeyword, setInternalKeyword] = useState(q);
  useEffect(() => {
    if (internalKeyword !== q) debouncedSetKeyword(internalKeyword);
  }, [internalKeyword]);
  return (
    <div
      className={joinClass(
        'relative border-b border-b-black w-full',
        "after:content-[''] after:bg-contain after:bg-search-oval after:w-6 after:h-6 after:absolute after:right-0"
      )}
    >
      <input
        type="text"
        value={internalKeyword}
        onChange={(ev) => setInternalKeyword(ev.target.value)}
        className="w-full"
      />
    </div>
  );
};
export default SearchBox;
