import createMiddleware from "next-intl/middleware";

import { localePrefix, locales } from "./navigation";
import { AvailableLocales, pathnames } from "./lib/locales";

export default createMiddleware({
  locales: locales,
  defaultLocale: AvailableLocales[0],
  localePrefix: localePrefix,
  pathnames,
  localeDetection: false,
  alternateLinks: false,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
