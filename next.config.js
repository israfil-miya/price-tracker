const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
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
