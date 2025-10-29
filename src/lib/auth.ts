import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema/schema";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins";
import { admin, guru, walimurid, ac } from "@/lib/permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 90 * 60, // Cache duration in seconds
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        guru,
        walimurid,
      },
    }),
    nextCookies(),
  ], // make sure this is the last plugin in the array
});
