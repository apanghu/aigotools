import { useTranslations } from "next-intl";

import Image from "@/components/ui/Image";
import SocialIcon from "@/components/ui/social-icons";

export default function About() {
  const t = useTranslations("about");

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t("metadata.title")}
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center space-x-2 pt-8">
          {t("avatar") && (
            <Image
              alt="avatar"
              className="h-48 w-48 rounded-full"
              height={192}
              src={t("avatar")}
              width={192}
            />
          )}
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
            {t("author")}
          </h3>
          <div className="text-gray-500 dark:text-gray-400">
            {t("occupation")}
          </div>
          <div className="text-gray-500 dark:text-gray-400">{t("company")}</div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon href={`mailto: ${t("email")}`} kind="mail" />
            <SocialIcon href={`${t("github")}`} kind="github" />
            <SocialIcon href={`${t("linkedin")}`} kind="linkedin" />
            <SocialIcon href={`${t("x")}`} kind="x" />
          </div>
        </div>
        <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
          {t.rich("children", {
            p: (chunks) => (
              <p className="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
                {chunks}
              </p>
            ),
          })}
        </div>
      </div>
    </div>
  );
}
