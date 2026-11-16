import getCollection from "@/db";

export default async function findLink(alias: string): Promise<string | null> {
  const links = await getCollection();
  const found = await links.findOne({ alias: alias });

  if (!found) {
    return null;
  }

  return found.url;
}
