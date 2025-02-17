/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/stream/**",
      },
      // Add any other domains you need to load images from
    ],
  },
}

module.exports = nextConfig

