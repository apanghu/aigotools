import { NextResponse } from "next/server";

import { sitemapIndex } from "../../sitemap";

export async function GET() {
  const sitemaps = await sitemapIndex();

  // 构建 XML 格式的 Sitemap Index 文件
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap) => `
    <sitemap>
      <loc>${sitemap.url}</loc>
      <lastmod>${sitemap.lastModified.toISOString()}</lastmod>
    </sitemap>`
    )
    .join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
