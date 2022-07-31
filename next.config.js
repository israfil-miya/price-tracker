const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      image: '/static/images/me.png',
      font: '/static/font/Poppins-Regular.ttf',
    },
  },
  images: {
    domains: [
      'platform-lookaside.fbsbx.com',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com',
    ],
  },
  reactStrictMode: true,
})
