import { ORPCError, os } from "@orpc/server";
import { Prisma } from "@/generated/prisma/client";
import { getAuthenticatedUser } from "@/lib/auth";
import { database } from "@/lib/database";
import { creatorApplicationInput } from "./creator-application-input";

export const submitCreatorApplicationProcedure = os
  .input(creatorApplicationInput)
  .handler(async ({ input }) => {
    const user = await getAuthenticatedUser();
    if (!user) throw new ORPCError("UNAUTHORIZED");

    try {
      await database.creatorProfile.create({ data: { ...input, email: user.email, userId: user.id } });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
      const existingProfile = await database.creatorProfile.findFirst({
        where: { OR: [{ userId: user.id }, { userId: null, email: user.email }] },
        select: { id: true },
      });
      if (!existingProfile) throw new ORPCError("CONFLICT");
    }
  });
