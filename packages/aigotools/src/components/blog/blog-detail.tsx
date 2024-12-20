import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

import * as Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Blog } from "@/models/blog";
import Image from "@/components/ui/Image";
import { formatDate } from "@/lib/utils";
import { Mdx } from "@/components/common/content/mdx-components";
export default function BlogDetail({ post }: { post: Blog }) {
  const t = useTranslations("blog");

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12">
        <article className="container relative max-w-3xl py-6 lg:py-10">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute left-[-200px] top-14 hidden xl:inline-flex"
            )}
            href={`/blog`}
          >
            <Icons.ChevronLeft className="mr-2 h-4 w-4" /> {t("seeAllPosts")}
          </Link>
          <div>
            <time
              className="block text-sm text-muted-foreground"
              dateTime={dayjs(post.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
            >
              Published on {formatDate(post.publishedAt)}
            </time>
            <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
              <Balancer>{post.name}</Balancer>
            </h1>
          </div>
          {post.image && (
            <Image
              priority
              alt={post.name}
              className="my-8 rounded-md border bg-muted transition-colors"
              height={405}
              src={post.image}
              width={720}
            />
          )}
          <Mdx code={post.content} />
          <hr className="mt-12" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              className={cn(buttonVariants({ variant: "ghost" }))}
              href={`/blog`}
            >
              <Icons.ChevronLeft className="mr-2 h-4 w-4" />
              {t("seeAllPosts")}
            </Link>
          </div>
        </article>
      </main>
      {/* <Loading isLoading={isLoading} /> */}
    </div>
  );
}
