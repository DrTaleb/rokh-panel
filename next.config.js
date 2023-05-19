/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://server.rokhdental.ir",
    LOCAL_URL: "http://localhost:3000",
  },
}
module.exports = nextConfig
