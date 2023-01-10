/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'utils'] // only run Eslint on the 'pages' and 'utils' directions
  }
}

module.exports = nextConfig
