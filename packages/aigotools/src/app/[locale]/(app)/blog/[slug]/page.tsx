import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import * as Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getBlogByName } from "@/lib/actions";
import Loading from "@/components/common/loading";
import { useQuery } from "@tanstack/react-query";
import BlogDetail from "@/components/blog/blog-detail";
import { getTranslations } from "next-intl/server";
import Container from "@/components/common/container";
import NavBar from "@/components/common/nav-bar";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const name = decodeURIComponent(params.slug.toString());
  const post = await getBlogByName(name);

  return {
    title: `${post?.blog.name}`,
    description: post?.blog.content,
    keywords: post?.blog.content,
  };
}
export default async function Page({ params }: { params: { slug: string } }) {
  const t = getTranslations("blog");
  const name = decodeURIComponent(params.slug.toString());
  const post = await getBlogByName(name);
  if (!post) {
    notFound();
  }
  return (
    <Container className="mt-4">
      <NavBar name={post.blog.name} />
      <BlogDetail post={post.blog} />
    </Container>
  );
}
