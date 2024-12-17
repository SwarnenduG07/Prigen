import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

interface CredentialsType {
  name : string,
  email: string,
  password: string,
  password_confirm?: string
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "John Doe" }, // Name field added
        email: { label: "Email", type: "text", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" },
        password_confirm: { label: "Confirm Password", type: "password", required: false }, // Optional for registration
      },
      async authorize(credentials: CredentialsType ) {
        const { name, email, password, password_confirm } = credentials;

        // Handle Registration
        if (password_confirm) {
          const registerRes = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              password,
              password_confirm,
            }),
          });

          if (!registerRes.ok) {
            const error = await registerRes.json();
            throw new Error(error.message || "Registration failed");
          }

          // Auto-login after successful registration
          const loginRes = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.token) {
            return {
              id: loginData.user_id,
              name: loginData.name,
              email,
              token: loginData.token,
            };
          }
          throw new Error("Auto-login after registration failed");
        }

        // Handle Login
        const loginRes = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.token) {
          return {
            id: loginData.user_id,
            name: loginData.name,
            email,
            token: loginData.token,
          };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT for sessions
  },

  callbacks: {
    async jwt({ token, user }: {token: any, user: any}) {
      if (user) {
        token.accessToken = user.token;
        token.user = { name: user.name, email: user.email };
      }
      return token;
    },

    async session({ token, session }: {token: any, session: any}) {
      if (token) {
        session.user = {
          ...session.user,
          name: token.user?.name,
          email: token.user?.email,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin", 
    signUp: "/signup", 
  },

  secret: process.env.NEXTAUTH_SECRET, // Ensure this is defined
};

export default NextAuth(authOptions);
