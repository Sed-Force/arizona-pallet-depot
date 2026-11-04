import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Keep links from the old static site working.
  async redirects() {
    return [
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/calculator.html", destination: "/checkout", permanent: true },
      { source: "/calculator", destination: "/checkout", permanent: true },
      { source: "/thanks.html", destination: "/thanks", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      // Old site images lived at the root.
      { source: "/pallet-:n(\\d+).jpg", destination: "/images/pallet-:n.jpg", permanent: true },
    ];
  },
};

export default nextConfig;
