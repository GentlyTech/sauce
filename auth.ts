import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {authConfig} from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({})],
});