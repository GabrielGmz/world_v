import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Permite las imágenes de placeholder
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Permite las imágenes de Unsplash (si usaste las que te pasé)
      }
    ],
  },
};

export default nextConfig;
