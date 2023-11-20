import dayjs, { ConfigType } from 'dayjs';
type _Class = string | null | undefined;
export const joinClass = (...classNames: _Class[]) => {
  return classNames.filter((c) => !!c).join(' ');
};
export const formatDate = (date: ConfigType, format: string) => {
  return dayjs(date).format(format);
};
