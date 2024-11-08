
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import * as Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Loading from "@/components/common/loading";
import { Blog } from "@/models/blog";

export default function BlogDetail({ post }: { post: Blog }) {
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12">
        <article className="container relative max-w-3xl py-6 lg:py-10">
          <Link
            href={`/blog`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute left-[-200px] top-14 hidden xl:inline-flex"
            )}
          >
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            {"seeAllPosts"}
          </Link>
          <div>
            {/* {post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="block text-sm text-muted-foreground"
              >
                Published on {post.publishedAt}
              </time>
            )} */}
            <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
              <Balancer>{post.name}</Balancer>
            </h1>


          </div>
          {/* {post.image && (
            <Image
              src={post.image}
              alt={post.name}
              width={720}
              height={405}
              className="my-8 rounded-md border bg-muted transition-colors"
              priority
            />
          )} */}
          {post.content}
          <hr className="mt-12" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href={`/blog`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icons.ChevronLeft className="mr-2 h-4 w-4" />
              {"seeAllPosts"}
            </Link>
          </div>
        </article>
      </main>
      {/* <Loading isLoading={isLoading} /> */}
    </div>
  );
}
