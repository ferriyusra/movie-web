import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, UserExtended, SessionExtended } from "@/types/Auth";
import authService from "@/services/auth.service";
import { environment } from "@/config/environment";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        const result = await authService.login({
          identifier,
          password,
        });

        const accessToken = result.data.data;
        const me = await authService.getProfileWithToken(accessToken);
        const user = me.data.data;

        if (
          accessToken &&
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accessToken = accessToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
