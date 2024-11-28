"use client";
import { Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import EmptyImage from "./empty-image";

import Search from "@/components/index/search";
import { searchSites } from "@/lib/actions";
import SiteGroup from "@/components/common/sites-group";
import Pagination from "@/components/common/Pagination";

export default function InfiniteSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = decodeURIComponent(searchParams.get("s") || "");
  const category = decodeURIComponent(searchParams.get("c") || "");
  const t = useTranslations("search");
  // 当前页数从 URL 参数获取（默认是 1）
  const currentPage = Number(searchParams.get("p") || 1);

  const { data, isFetching } = useQuery({
    queryKey: ["search-sites", currentPage, search, category],
    queryFn: async () => {
      return await searchSites({ search, page: currentPage, category });
    },
    initialData: null,
  });

  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   refetch,
  // } = useInfiniteQuery({
  //   queryKey: ["search-sites"],
  //   queryFn: async ({ pageParam = 1 }) => {
  //     return await searchSites({ search, page: pageParam, category });
  //   },
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage.hasNext) {
  //       return lastPage.page + 1;
  //     }
  //   },
  //   throwOnError(error) {
  //     console.log(error);
  //     toast.error("loadFailed");

  //     return false;
  //   },
  //   refetchOnWindowFocus: false,
  // });

  // useEffect(() => {
  //   refetch({});
  // }, [search, refetch, category]);

  const sites = data?.sites || [];
  const totalCount = data?.totalCount || 0; // 假设服务端返回的总页数
  const totalPages = Math.ceil(totalCount / 25); // 假设每页 10 条

  const handlePageChange = (page: number) => {
    router.push(`/search?s=${search}&c=${category}&p=${page}`);
  };

  return (
    <>
      <Search category={category} className="sm:mt-12" defaultSearch={search} />
      <SiteGroup sites={sites} title={t("result")} />
      <div className="flex justify-center mt-8">
        {isFetching ? (
          <Spinner className="my-24" />
        ) : sites.length > 0 ? (
          <div className="flex flex-col items-center mt-8">
            <Pagination
              currentPage={currentPage}
              pageSize={5} // 可见页码数量
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : sites.length <= 0 ? (
          <div className="text-center my-16">
            <EmptyImage className="dark:invert" />
            <div className="mt-6 font-medium">{t("empty")}</div>
          </div>
        ) : null}
      </div>
    </>
  );
}
