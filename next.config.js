/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://server.rokhdental.ir",
    LOCAL_URL: "https://rokh-panel.iran.liara.run",
  },
}
module.exports = nextConfig
