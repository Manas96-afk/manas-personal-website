import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'motion', 'gsap'],
};

export default nextConfig;
