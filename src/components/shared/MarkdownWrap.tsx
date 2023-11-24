import { joinClass } from '@/utils';
import { PropsWithChildren } from 'react';

const MarkdownWrap = ({
  children,
  className,
}: PropsWithChildren & PropsWithClass) => {
  return (
    <div
      data-comp="markdown-wrap"
      className={joinClass('[&_li]:list-disc [&_li]:ml-4', className)}
    >
      {children}
    </div>
  );
};
export default MarkdownWrap;
