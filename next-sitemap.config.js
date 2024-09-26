/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    transformRobotsTxt: async (config, robotsTxt) => {
      const siteUrl = process.env.SITE_URL || "http://localhost:3000";
      return `${robotsTxt}\n# RSS Feed\nRSS: ${siteUrl}/api/feed`;
    },
  },
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    // カスタム優先度の設定
    let priority = 0.7;
    if (path === "/") priority = 1.0;
    else if (path === "/about" || path === "/contact") priority = 0.8;
    else if (path.startsWith("/posts/")) priority = 0.6;

    // カスタム更新頻度の設定
    let changefreq = "weekly";
    if (path === "/about" || path === "/contact") changefreq = "monthly";

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
