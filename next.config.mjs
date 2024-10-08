/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true, // This enables the App Router (new directory-based routing)
    },
  };
  
  export default nextConfig;
  