/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "img.clerk.com", "www.gravatar.com"],
  },
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
  },
};

export default nextConfig;
