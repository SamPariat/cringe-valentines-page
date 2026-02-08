import { redirect } from "next/navigation";
import { getValentine, trackSuccessView } from "@/lib/actions/valentine";
import { SuccessClient } from "./page.client";

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const id = typeof params.id === "string" ? params.id : undefined;

  if (!id) {
    redirect("/");
  }

  const valentine = await getValentine(id);

  if (!valentine || !valentine.accepted_at) {
    redirect(`/?id=${id}`);
  }

  await trackSuccessView(id);

  return (
    <SuccessClient
      recipientName={valentine.recipient_name}
      gender={valentine.gender}
    />
  );
}
