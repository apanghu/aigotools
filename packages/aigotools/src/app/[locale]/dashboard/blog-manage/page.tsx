import { useTranslations } from "next-intl";

import DashboardTitle from "@/components/common/dashboard-title";
import BlogTable from "@/components/blog-manage/blog-table";

export default function SiteManage() {
  const t = useTranslations("blogManage");

  return (
    <div className="p-6 w-full">
      <DashboardTitle title={t("title")} />
      <BlogTable />
    </div>
  );
}
