"use client";
import dayjs from "dayjs";
import { Divider, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";

import VoteButton from "./vote-button";
import ListItem from "./list-item";
import SiteTags from "./site-tags";

import { Site } from "@/models/site";
import IframeEmbed from "@/components/common/Iframe";
import RatingComponent from "@/components/common/RatingComponent";

export default function SiteDetail({ site }: { site: Site }) {
  const t = useTranslations("site");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-9">
      <Link
        className="flex items-center justify-center cursor-pointer"
        href={site.url}
        target="_blank"
      >
        <h2
          className={clsx(
            "inline-flex relative gap-2 px-2 items-center justify-center text-center text-3xl leading-0 font-bold text-primary-800",
            "after:content-[' '] after:overflow-hidden after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:bg-primary-800 after:w-0 hover:after:w-full after:transition-width"
          )}
        >
          {site.descriptionIcon && (
            <Image
              alt={site.name}
              className="rounded-full border float-left m-15"
              height={75}
              src={site.descriptionIcon}
              width={75}
            />
          )}
          <span>{site.name}</span>
          {/* <ExternalLink size={22} strokeWidth={3} /> */}
        </h2>
      </Link>
      <div className="text-center mt-5 text-primary-500 font-medium text-sm">
        <RatingComponent site={site} />
      </div>
      <div className="text-center mt-5 text-primary-500 font-medium text-sm">
        {dayjs(site.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
      </div>
      <div className="mt-9 flex flex-wrap lg:flex-nowrap gap-6">
        <div
          className="flex-1 basis-full lg:basis-[30%] relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            isZoomed
            alt={site.name}
            classNames={{
              wrapper: "w-full !max-w-full cursor-pointer",
              img: "w-full aspect-video object-fill",
            }}
            radius="sm"
            src={site.snapshot}
          />
          {isHovered && site.tags?.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10">
              {site.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-tiny font-medium py-[1px] px-2 rounded-[4px] bg-primary-700 text-primary-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <SiteTags site={site} />
        </div>
        <div className="flex-1 basis-full lg:basis-[70%] text-base text-primary-700 font-normal">
          <div dangerouslySetInnerHTML={{ __html: site.desceription }}>
            {/* {site.desceription}  */}
          </div>
          <div className="mt-10">
            <IframeEmbed
              buttonText="Play the game"
              iconImage={site.descriptionIcon} // Icon 图片的 URL
              src={site.url} // 游戏的 URL
              title={site.name}
            />
          </div>
          {site.features.length > 0 && (
            <>
              <h3 className="my-6 font-bold text-2xl text-primary-800">
                {t("topFeatures")}
              </h3>
              <ol>
                {site.features.map((item, i) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </ol>
            </>
          )}
          {site.usecases.length > 0 && (
            <>
              <h3 className="my-6 font-bold text-2xl text-primary-800">
                {t("usecases")}
              </h3>
              <ol>
                {site.usecases.map((item, i) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </ol>
            </>
          )}
          {site.links &&
            Object.values(site.links).filter(Boolean).length > 0 && (
              <>
                <h3 className="my-6 font-bold text-2xl text-primary-800">
                  {t("links")}
                </h3>
                <ol>
                  {site.links.login && (
                    <ListItem>
                      <Link
                        className="hover:underline"
                        href={site.links.login}
                        target="_blank"
                      >
                        {t("loginPage")}: {site.links.login}
                      </Link>
                    </ListItem>
                  )}
                  {site.links.register && (
                    <ListItem>
                      <Link
                        className="hover:underline"
                        href={site.links.register}
                        target="_blank"
                      >
                        {t("registerPage")}: {site.links.register}
                      </Link>
                    </ListItem>
                  )}
                  {site.links.documentation && (
                    <ListItem>
                      <Link
                        className="hover:underline"
                        href={site.links.documentation}
                        target="_blank"
                      >
                        {t("docPage")}: {site.links.documentation}
                      </Link>
                    </ListItem>
                  )}
                  {site.links.pricing && (
                    <ListItem>
                      <Link
                        className="hover:underline"
                        href={site.links.pricing}
                        target="_blank"
                      >
                        {t("pricingPage")}: {site.links.pricing}
                      </Link>
                    </ListItem>
                  )}
                </ol>
              </>
            )}
        </div>
      </div>
      <div className="mx-auto max-w-full w-[720px] gap-6">
        <Divider className="mt-12 mb-8 bg-primary-300" />
        <div className="flex gap-6 items-center justify-center">
          {/* <Link href={site.url} target="_blank">
            <Button
              className="w-56 font-semibold"
              color="primary"
              radius="sm"
              variant="bordered"
            >
              <Navigation size={14} strokeWidth={3} />
              {t("visitSite")}
            </Button>
          </Link> */}
          <VoteButton site={site} />
        </div>
      </div>
    </div>
  );
}
