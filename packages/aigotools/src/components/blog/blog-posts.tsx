"use client";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { usePathname } from "next/navigation";
import { compareDesc } from "date-fns";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getAllBlogs } from "@/lib/actions";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  //const basePath = pathname.split("/")[1];
  const basePath = pathname ? pathname.split("/")[1] : null;
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}
const POSTS_PER_PAGE = 5;

export function BlogPosts() {
  const t = useTranslations("blog");
  const [loading, setIsLoading] = useState(false);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["get-all-blogs"],
    queryFn: async () => {
      return await getAllBlogs();
    },
    initialData: [],
  });
  const posts = blogs
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
    });
  const pageNumber = 1;
  const initialDisplayPosts = blogs?.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts?.length / POSTS_PER_PAGE),
  };

  const displayPosts =
    initialDisplayPosts?.length > 0 ? initialDisplayPosts : posts;

  return (
    <div className="container space-y-10 py-6 md:py-10">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t("blogPosts")}
        </h1>
      </div>
      <section>
        <h2 className="font-heading mb-4 text-3xl">{t("lastPost")}</h2>
        <article className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {/* {displayPosts[0]?.image && (
              <Image
                alt={displayPosts[0].name}
                className="w-full rounded-lg border object-cover object-center md:h-64 lg:h-72"
                height={452}
                src={displayPosts[0].image}
                width={804}
              />
            )} */}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-heading mb-2 text-2xl md:text-4xl">
              <Balancer>{displayPosts[0]?.name}</Balancer>
            </h3>
            {displayPosts[0]?.content && (
              <p className="text-muted-foreground md:text-lg">
                <Balancer>{displayPosts[0]?.content}</Balancer>
              </p>
            )}
            <Link
              className="absolute inset-0"
              href={"/blog/" + displayPosts[0]?.name}
            >
              <span className="sr-only">View Article</span>
            </Link>
          </div>
        </article>
      </section>

      <section>
        <h2 className="font-heading mb-4 text-3xl">{t("blogPosts")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.slice(1).map((post) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {/* {post.image && (
                <Image
                  alt={post.name}
                  src={post.image}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                />
              )} */}
              <h2 className="font-heading line-clamp-1 text-2xl">
                {post.name}
              </h2>
              {post.content && (
                <p className="line-clamp-1 text-muted-foreground">
                  {post.content}
                </p>
              )}
              {post.publishedAt && (
                <p className="text-sm text-muted-foreground">
                  {post.publishedAt}
                </p>
              )}
              <Link className="absolute inset-0" href={"/blog/" + post?.name}>
                <span className="sr-only">{t("viewArticle")}</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}
