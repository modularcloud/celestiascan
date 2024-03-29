import { redirect } from "next/navigation";
import { env } from "~/env";

export interface PageProps {}

export default function Page(props: PageProps) {
  if (env.NEXT_PUBLIC_TARGET !== "electron") {
    redirect("/");
  }
  return <></>;
}
