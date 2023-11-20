import { joinClass } from '@/utils';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface PrettyLinkProps extends PropsWithClass, PropsWithChildren {
  href: string;
}

const PrettyLink = ({ href, className, children }: PrettyLinkProps) => {
  return (
    <Link
      href={href}
      className={joinClass(
        'text-black bg-dot-underline-black bg-repeat-x bg-[length:4px_4px] bg-[bottom_left_2px]',
        'hover:bg-wave-underline-black hover:bg-[length:15px_5px] hover:animate-underline hover:pb-[5px]',
        'focus:bg-wave-underline-black focus:bg-[length:15px_5px] focus:animate-underline focus:pb-[5px]',
        'dark:text-white dark:bg-dot-underline-white',
        'dark:hover:bg-wave-underline-white dark:focus:bg-wave-underline-white',
        className
      )}
    >
      {children}
    </Link>
  );
};

export default PrettyLink;
