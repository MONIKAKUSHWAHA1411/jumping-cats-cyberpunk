import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: ".",
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
