/** @type {import('next').NextConfig} */
const isProduction=process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
 
  compiler: isProduction?{
     removeConsole: {
      exclude: ['error'],
    }

  }:{}

}

module.exports = nextConfig