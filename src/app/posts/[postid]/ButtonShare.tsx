'use client';

import IconShare from '@/components/icons/IconShare';
import ButtonOutline from '@/components/shared/ButtonOutline';
import { copyToClipboard } from '@/utils/browser';

const ButtonShare = ({ url }: { url: string }) => {
  return (
    <ButtonOutline
      className="mb-[30px] gap-4"
      onClick={() => copyToClipboard(url)}
    >
      <IconShare />
      Share
    </ButtonOutline>
  );
};

export default ButtonShare;
