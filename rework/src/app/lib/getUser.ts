"use server";

import { cookies } from "next/headers";

export default async function getUser() {
  const user = cookies().get("user");
  if (!user?.value) return { user: undefined, ok: false };
  else return { user: JSON.parse(user.value), ok: true };
}
