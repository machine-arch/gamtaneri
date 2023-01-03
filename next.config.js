/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // useFileSystemPublicRoutes: false,
  //image loader costum
  images: {
    loader: "custom",
    domains: ["gamtaneri.ge"],
  },
};
module.exports = nextConfig;
