import { getTranslations } from "next-intl/server";
import { Button } from "@nextui-org/react";

import Container from "@/components/common/container";
import Hero from "@/components/index/hero";
import Search from "@/components/index/search";
import SiteGroup from "@/components/common/sites-group";
import { getFeaturedSites, getLatestSites, getHotSites } from "@/lib/actions";
import FAQ from "@/components/common/faq";
import PromoTop from "@/components/common/PromoTop";
import { Link } from "@/navigation";
export default async function Page() {
  const t = await getTranslations("index");
  const [featuredSites, latestSites, hotSites] = await Promise.all([
    getFeaturedSites(),
    getLatestSites(),
    getHotSites(),
  ]);

  return (
    <>
      <Container>
        <Hero />
        <Search />
        <PromoTop sites={hotSites} />
        <SiteGroup id="featured" sites={featuredSites} title={t("featured")} />
        <SiteGroup id="latest" sites={latestSites} title={t("latest")} />
        <div className="flex justify-center mt-8">
          {" "}
          <Link href={"/search"}>
            <Button
              className="font-semibold"
              color="primary"
              size="lg"
              // startContent={<TicketPlus size={16} />}
            >
              {t("more")}
            </Button>
          </Link>
        </div>
        <FAQ />
      </Container>
    </>
  );
}
