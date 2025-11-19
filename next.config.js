/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',        // REQUIRED for Capacitor
  distDir: 'out',          // Capacitor expects /out
  images: {
    unoptimized: true,     // required for static export
  },
};

module.exports = nextConfig;
