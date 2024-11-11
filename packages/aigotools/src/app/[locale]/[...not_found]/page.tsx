"use client";
import { useTranslations } from "next-intl";

import Link from "@/components/ui/Link";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        {" "}
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2">
          <main className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12">
            <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
              <div className="space-x-2 pb-8 pt-6 md:space-y-5">
                <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
                  {t("metadata.title")}
                </h1>
              </div>
              <div className="max-w-md">
                <h2 className="mb-4 text-xl font-bold leading-normal md:text-2xl">
                  {t("description1")}
                </h2>
                <p className="mb-8"> {t("description2")}</p>
                <Link
                  className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
                  href={`/`}
                >
                  {t("backto")}
                </Link>
              </div>
            </div>
          </main>
        </div>
      </main>
      <Footer />
    </>
  );
}
