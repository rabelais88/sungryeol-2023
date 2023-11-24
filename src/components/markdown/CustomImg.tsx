import { getUrlValid } from '@/utils';

interface CustomImgProps {
  src: string;
  alt?: string;
  title?: string;
  hostUrl: string;
}
const CustomImg = ({ src, alt, hostUrl }: CustomImgProps) => {
  const urlValid = getUrlValid(src);
  return <img src={urlValid ? src : `${hostUrl}/${src}`} alt={alt} />;
};

export default CustomImg;
