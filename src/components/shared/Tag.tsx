import { joinClass } from '@/utils';
import { PropsWithChildren } from 'react';

interface TagProps extends PropsWithChildren, PropsWithClass {}
const Tag = ({ children, className }: TagProps) => {
  return (
    <span
      data-comp="tag"
      className={joinClass(
        'inline-flex text-black rounded-full border border-[#1a202c] text-sm font-normal px-2 h-[24px]',
        'dark:border-white dark:text-white',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Tag;
