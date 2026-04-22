import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "play.google.com",
        port: "",
        pathname: "/**",  
      },
      {
        protocol: "https",
        hostname: "developer.apple.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
    ],
  }, 
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
