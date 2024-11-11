import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import Container from "@/components/common/container";
import NavBar from "@/components/common/nav-bar";
import { BlogPosts } from "@/components/blog/blog-posts";

export async function generateMetadata({
  params,
}: {
  params: { site: string; locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "blog",
  });

  return {
    title: t("metadata.title"),
  };
}

export default function Page() {
  const t = useTranslations("blog");

  return (
    <Container>
      <NavBar name={t("metadata.title")} />
      <main className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12">
        <BlogPosts />
      </main>
    </Container>
  );
}
