"use server";

import { db } from "@/lib/db";
import { links, type NewLink } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

export async function createLink(
  data: Omit<NewLink, "userId" | "order" | "clicks">,
) {
  const userId = await getUserId();

  const maxOrderResult = await db
    .select({ maxOrder: links.order })
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.order))
    .limit(1);

  const nextOrder = (maxOrderResult[0]?.maxOrder ?? -1) + 1;

  const [newLink] = await db
    .insert(links)
    .values({
      ...data,
      userId,
      order: nextOrder,
    })
    .returning();

  revalidatePath("/admin");
  return newLink;
}

export async function updateLink(linkId: number, data: Partial<NewLink>) {
  const userId = await getUserId();

  const [updatedLink] = await db
    .update(links)
    .set(data)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  revalidatePath("/admin");
  return updatedLink;
}

export async function deleteLink(linkId: number) {
  const userId = await getUserId();

  await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)));

  revalidatePath("/admin");
}

export async function reorderLinks(linkIds: number[]) {
  const userId = await getUserId();

  await db.transaction(async (tx) => {
    for (let i = 0; i < linkIds.length; i++) {
      await tx
        .update(links)
        .set({ order: i })
        .where(and(eq(links.id, linkIds[i]), eq(links.userId, userId)));
    }
  });

  revalidatePath("/admin");
}

export async function getUserLinks() {
  const userId = await getUserId();

  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(links.order);
}

export async function incrementLinkClicks(linkId: number) {
  await db
    .update(links)
    .set({ clicks: sql`${links.clicks} + 1` })
    .where(eq(links.id, linkId));
}
