"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import BlogEdit from "./blog-edit";
import BlogOperation from "./blog-operation";

import { BlogSearchForm, managerSearchBlogs } from "@/lib/actions";
import Loading from "@/components/common/loading";
import EmptyImage from "@/components/search/empty-image";
import { Blog } from "@/models/blog";
import { createTemplateBlog } from "@/lib/create-template-blog";

export default function BlogTable() {
  const t = useTranslations("blogManage");
  const [searchResult, setSearchResult] = useState({
    blogs: [] as Blog[],
    count: 0,
    totalPage: 0,
  });
  const [blog, setBlog] = useState<Blog | undefined>(undefined);

  const [loading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<BlogSearchForm>({
    page: 1,
    size: 15,
  });

  const handleSearch = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setIsLoading(true);

      const result = await managerSearchBlogs(searchParams);

      setSearchResult(result);
    } catch (error) {
      console.log(error);
      toast.error(t("failSearch"));
    } finally {
      setIsLoading(false);
    }
  }, [loading, searchParams, t]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const { data: allTopBlogs } = useQuery({
    queryKey: ["get-top-blogs"],
    queryFn: async () => {
      const res = await managerSearchBlogs({
        page: 1,
        size: 999
      });

      return res.blogs;
    },
    initialData: [],
  });

  const topBlogNameMap = useMemo(() => {
    return allTopBlogs.reduce((t, c) => {
      return {
        ...t,
        [c._id]: c.name,
      };
    }, {} as Record<string, string>);
  }, [allTopBlogs]);

  console.log(topBlogNameMap);

  return (
    <div className="mt-4 relative py-4">
      <div
        className="flex items-center justify-end gap-4"
        onSubmit={handleSearch}
      >
        <Button
          size="sm"
          startContent={<Plus size={14} />}
          onClick={() => setBlog(createTemplateBlog())}
        >
          {t("new")}
        </Button>
        <div className="flex-1" />
        <Input
          className="w-96"
          placeholder={t("inputSearch")}
          size="sm"
          onChange={debounce(
            (e) =>
              setSearchParams({
                ...searchParams,
                search: e.target.value,
                page: 1,
              }),
            1000,
            {
              maxWait: 5000,
            }
          )}
        />
      </div>
      <div className="mt-6 relative">
        <Table className="mt-6" shadow="sm">
          <TableHeader>
            <TableColumn>{t("name")}</TableColumn>
            <TableColumn>{t("content")}</TableColumn>
            <TableColumn>{t("views")}</TableColumn>
            <TableColumn>{t("publishedAt")}</TableColumn>
            <TableColumn>{t("featured")}</TableColumn>
            <TableColumn>{t("author")}</TableColumn>
            <TableColumn maxWidth={160}>{t("updatedAt")}</TableColumn>
            <TableColumn maxWidth={160}>{t("operation")}</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              <div className="w-full flex py-60 items-center justify-center">
                <EmptyImage className="dark:invert" />
              </div>
            }
          >
            {searchResult.blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  {blog.image}
                  {blog.name}
                </TableCell>
                <TableCell>{blog.content}</TableCell>
                <TableCell>{blog.views}</TableCell>
                <TableCell>
                  {dayjs(blog.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell>{blog.published}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  {dayjs(blog.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell>
                  <BlogOperation
                    blog={blog}
                    handleSearch={handleSearch}
                    onEdit={() => setBlog(blog)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Loading isLoading={loading} />
      </div>

      <div className="flex items-center justify-between mt-4 px-4 gap-4">
        <div className="text-primary-400 text-sm flex-grow-0 flex-shrink-0 basis-48">
          Total {searchResult.count}
        </div>
        <div className="pr-48 flex-1 flex items-center justify-center">
          {searchResult.totalPage > 0 && (
            <Pagination
              showControls
              showShadow
              isDisabled={loading}
              page={searchParams.page}
              size="md"
              total={searchResult.totalPage}
              onChange={(page) => {
                setSearchParams({
                  ...searchParams,
                  page,
                });
              }}
            />
          )}
        </div>
      </div>
      <BlogEdit
        blog={blog}
        onClose={() => {
          setBlog(undefined);
          handleSearch();
        }}
      />
    </div>
  );
}
