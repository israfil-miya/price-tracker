import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import { MongooseAdapter } from '@choutkamartin/mongoose-adapter'
const scopes = ['identify'].join(' ')
export default NextAuth({
  adapter: MongooseAdapter(process.env.MONGODB_URI),
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {params: {scope: scopes}},
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.uid = user.id
      }
      return Promise.resolve(token)
    },
    async session({ session, user, token }) {
      session.user.uid = user.id
      return Promise.resolve(session)
    },
  },
  //debug: true,
  pages: {
    signIn: '/',
    error: '/',
  },
})
