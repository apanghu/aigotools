import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getBlogByName } from "@/lib/actions";
import BlogDetail from "@/components/blog/blog-detail";
import Container from "@/components/common/container";
import NavBar from "@/components/common/nav-bar";

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
  const t = await getTranslations("blog");
  const name = decodeURIComponent(params.slug.toString());
  const post = await getBlogByName(name);

  if (!post) {
    notFound();
  }

  return (
    <Container className="mt-4">
      <NavBar name={[t("metadata.title"), post.blog.name]} />
      <BlogDetail post={post.blog} />
    </Container>
  );
}
