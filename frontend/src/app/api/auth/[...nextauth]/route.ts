import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

// const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'REPLACE.THIS';

const handler = NextAuth({
  //   secret: SECRET_KEY,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          console.log(credentials);
          if (!credentials) return null;

          const res = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) throw new Error('Invalid credentials');

          const user = await res.json();

          return {
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            token: user.token,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = { id: token.id, name: token.name, email: token.email };
      // @ts-ignore
      session.token = token.token; // Pass API token to session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
