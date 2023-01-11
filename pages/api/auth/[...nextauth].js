import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import { validateAllOnce } from '../../../utils/common';
import { dbConnect } from '../../../lib/db-connect';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" }
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        //  const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        try {
          const { email, password } = credentials;
          console.log({ email, password });

          validateAllOnce({ email, password });

          //db connect
          await dbConnect();

          const user = await User.findOne({ email }).exec();
          if (!user) throw new Error('Something went wrong');
          const userDoc = user._doc;
          const isMatched = await bcrypt.compare(password, userDoc.password);
          console.log({ isMatched });

          if (user && isMatched) {
            // Any object returned will be saved in `user` property of the JWT
            delete userDoc.password;
            return userDoc;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            // return null;
            throw new Error('Email or Password Incorrect..!');

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
            throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      console.log('session', { session, user });
      if (user && user.id) session.user.id = user.id;

      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log('jwt', { token, user });
      if (user && user._id) token.id = user._id;
      return token;
    },
  },
});
