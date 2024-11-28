import clsx from "clsx";
import React from "react";
import { useTranslations } from "next-intl";
import { Divider } from "@nextui-org/react";

import Container from "./container";
import Logo from "./logo";

import { AppConfig } from "@/lib/config";
import { Link } from "@/navigation";

export default function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <Container className={clsx(className, "pb-12")}>
      <Divider className="mt-16 sm:mt-28 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Left Side: Logo and Slogan */}
        <div className="flex flex-col">
          <Logo className="text-[28px] mb-4" />
          <div className="font-medium text-primary text-sm sm:text-base mb-2">
            {t("slogan")}.
          </div>
          <div className="font-normal text-primary text-xs sm:text-sm">
            @2024 {AppConfig.siteName}. All rights reserved.
          </div>
        </div>

        {/* Middle Column: Sitemap Links */}
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-primary text-lg">
            {t("usefulLinks")}
          </div>
          <Link
            className="text-sm text-primary hover:text-accent"
            href="/sitemap-index"
          >
            {t("sitemap")}
          </Link>
          <Link
            className="text-sm text-primary hover:text-accent"
            href={"https://gamenav.org"}
            target="_blank"
          >
            GameNav
          </Link>
          <Link
            className="text-sm text-primary hover:text-accent"
            href={"/#featured"}
          >
            {t("featured")}
          </Link>
          <Link
            className="text-sm text-primary hover:text-accent"
            href={"/#latest"}
          >
            {t("latestSubmit")}
          </Link>
        </div>

        {/* Right Column: Additional Links */}
        <div className="flex flex-col space-y-2 sm:text-right">
          <div className="font-semibold text-primary text-lg">
            {t("getInTouch")}
          </div>
          <Link
            className="text-sm text-primary hover:text-accent"
            href={"/submit"}
          >
            {t("submitATool")}
          </Link>
        </div>
      </div>
    </Container>
  );
}
