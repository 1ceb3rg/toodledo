/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:'/toodledo',
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  
}
  
}

module.exports = nextConfig
