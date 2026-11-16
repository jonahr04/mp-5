"use server";

import getCollection from "@/db";

export default async function createLink(url: string, alias: string): Promise<string> {
  if (alias.trim() === "" || alias.includes(" ") || alias.includes("/")) {
    return "alias cant have spaces or slashes";
  }

  let valid = false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      valid = true;
    }
  } catch (e) {
    valid = false;
  }

  if (!valid) {
    return "that url is not valid";
  }

  // insert in DB
  const links = await getCollection();
  const existing = await links.findOne({ alias: alias });
  if (existing) {
    return "that alias is already taken";
  }

  const res = await links.insertOne({ alias: alias, url: url });
  if (!res.acknowledged) {
    return "could not save the link";
  }

  return "";
}
