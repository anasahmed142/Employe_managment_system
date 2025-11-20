/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // REQUIRED for Capacitor export,standalone
  distDir: 'out',          // Capacitor expects /out
  images: {
    unoptimized: true,     // required for static export
  },
};

module.exports = nextConfig;
