import { redirect } from "next/navigation";
import { MissingGenderError } from "@/components/valentine";
import { getValentine } from "@/lib/actions/valentine";
import { parseGenderParam } from "@/lib/parseGenderParam";
import { ValentineClient } from "./page.client";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const id = typeof params.id === "string" ? params.id : undefined;
  const nameParam =
    typeof params.name === "string"
      ? params.name
      : typeof params.n === "string"
        ? params.n
        : "";
  const genderParam =
    typeof params.gender === "string"
      ? params.gender
      : typeof params.g === "string"
        ? params.g
        : "";

  if (id) {
    const valentine = await getValentine(id);

    if (valentine) {
      if (valentine.accepted_at) {
        redirect(`/success?id=${id}`);
      }

      return (
        <ValentineClient
          valentine={valentine}
          name={valentine.recipient_name}
          gender={valentine.gender}
        />
      );
    }
  }

  const urlSearchParams = new URLSearchParams();
  if (genderParam) urlSearchParams.set("gender", genderParam);
  const gender = parseGenderParam(urlSearchParams);

  if (!gender) {
    return <MissingGenderError recipientName={nameParam.trim() || undefined} />;
  }

  return (
    <ValentineClient valentine={null} name={nameParam.trim()} gender={gender} />
  );
}
