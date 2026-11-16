import getCollection from "@/db";

export default async function findLink(alias: string): Promise<string | null> {
  const links = await getCollection();
  const found = await links.findOne({ alias: alias });

  if (!found || typeof found.url !== "string") {
    return null;
  }

  return found.url;
}
