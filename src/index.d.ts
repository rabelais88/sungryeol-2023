declare interface PropsWithClass {
  className?: string;
}

declare type MyPageProps<
  Params extends string[],
  SearchParams extends string[] | undefined = undefined,
> = SearchParams extends undefined
  ? { params: Record<Params[number], string> }
  : {
      params: Record<Params[number], string>;
      searchParams: Record<SearchParams[number], string>;
    };
