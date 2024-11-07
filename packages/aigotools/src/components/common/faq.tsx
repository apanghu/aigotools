import { useTranslations, useLocale } from "next-intl";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
export default function FAQ() {
  const t = useTranslations("faq");

  // 假设 faqData 是一个数组，包含每个问题和答案的 `title` 和 `content`
  const faqData = t.raw("faqs"); // 使用 `t.raw` 来获取数组内容
  const locale = useLocale();
  return (
    <section className="text-zinc-900 py-8 sm:py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="mx-auto md:text-center">
          <h2 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-primary-800 sm:text-6xl">
            {t("title")}
          </h2>
          <h3 className="mx-auto mt-6 max-w-xl text-lg text-primary-600 leading-7">
            {t("description")}
          </h3>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqData?.length ? (
            <>
              {faqData.map(
                (
                  item: {
                    title: string;
                    content: string;
                  },
                  index: Key | null | undefined
                ) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium text-primary-700">
                      {item.title}
                    </h3>
                    <p className="text-base text-zinc-500">{item.content}</p>
                  </div>
                )
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
