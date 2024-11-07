import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Istok_Web } from "next/font/google";

const istokWeb = Istok_Web({
  subsets: ["latin"],
  weight: "700",
});

export default function Hero() {
  const t = useTranslations("index");

  return (
    <div
      className={clsx(
        istokWeb.className,
        "mt-10 sm:mt-16 text-3xl sm:text-5xl max-w-[1000px] !leading-[1.3] mx-auto font-bold text-center text-primary-800"
      )}
    >
      <h1 className="text-5xl font-bold"> {t("slogan")}</h1>
      <h2 className="mt-[5px] text-sm font-bold lg:my-3"> {t("subTitle")}</h2>
    </div>
  );
}
