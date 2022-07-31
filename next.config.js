const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
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
