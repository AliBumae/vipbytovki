import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  serverExternalPackages: ["@react-three/fiber", "@react-three/drei", "three"]
};

export default nextConfig;
