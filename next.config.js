const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    image: '/static/images/me.png',
    font: '/static/font/Poppins-Regular.ttf',
  },
})

const nextConfig = withPWA({
  images: {
    domains: [
      'platform-lookaside.fbsbx.com',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com',
    ],
  },
  reactStrictMode: true,
})

module.exports = nextConfig
