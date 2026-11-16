import { redirect } from "next/navigation";
import findLink from "@/lib/findLink";

export default async function Go({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  const url = await findLink(alias);

  if (!url) {
    return <p>no link for that alias</p>;
  }

  redirect(url);
}
