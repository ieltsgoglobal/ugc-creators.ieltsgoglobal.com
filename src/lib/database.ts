import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

export const database = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL,
    enableChannelBinding: true,
  }),
});
