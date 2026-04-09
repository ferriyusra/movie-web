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
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const result = await authService.login({ email, password });
          const { accessToken, refreshToken, user } = result.data.data;

          if (accessToken && result.status === 200 && user?.id) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken,
              refreshToken,
            };
          }
          return null;
        } catch {
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
