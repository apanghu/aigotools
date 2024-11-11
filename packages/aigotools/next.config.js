const createNextIntlPlugin = require("next-intl/plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [];
  },
  async redirects() {
    return [];
  },
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [],
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "cdn.buymeacoffee.com",
      "pic2.zhimg.com",
      "c-ssl.duitang.com",
      "freakytextgenerator.us",
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
