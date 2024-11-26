import { getTranslations } from "next-intl/server";

import Container from "@/components/common/container";
import Hero from "@/components/index/hero";
import Search from "@/components/index/search";
import SiteGroup from "@/components/common/sites-group";
import { getFeaturedSites, getLatestSites } from "@/lib/actions";
import FAQ from "@/components/common/faq";
import PromoTop from "@/components/common/PromoTop";
export default async function Page() {
  const t = await getTranslations("index");
  const [featuredSites, latestSites] = await Promise.all([
    getFeaturedSites(),
    getLatestSites(),
  ]);

  return (
    <>
      <Container>
        <Hero />
        <Search />
        <PromoTop sites={featuredSites} />
        <SiteGroup id="featured" sites={featuredSites} title={t("featured")} />
        <SiteGroup id="latest" sites={latestSites} title={t("latest")} />
        <FAQ />
      </Container>
    </>
  );
}
