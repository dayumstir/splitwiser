import { HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="">
        Splitwiser
      </main>
    </HydrateClient>
  );
}
