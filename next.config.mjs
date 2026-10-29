import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-router-dom': path.resolve(__dirname, 'src/lib/react-router-compat.jsx'),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/lib/react-router-compat.jsx',
    },
  },
};

export default nextConfig;
