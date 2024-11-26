import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { AvailableLocales } from "@/lib/locales";

export const locales = AvailableLocales;
// Use the default: `always`，设置为 as-needed可不显示默认路由
export const localePrefix = "as-needed";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
