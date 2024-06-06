/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
