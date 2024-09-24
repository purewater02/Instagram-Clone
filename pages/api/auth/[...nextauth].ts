import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.signInProvider = account.provider;
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token, user }: any) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      console.log("callback session token: ", token);
      session.accessToken = token.accessToken;
      session.user.signInProvider = token.signInProvider;
      session.user.uid = token.sub;
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_SECRET,
});
