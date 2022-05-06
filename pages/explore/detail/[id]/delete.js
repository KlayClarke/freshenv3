import Link from "next/link";
import { useRouter } from "next/router";
import unentity from "../../../../utils/unentity";

export default function Delete({ salon }) {
  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + `/api/salons/delete/${salon.id}`,
      {
        method: "POST",
      }
    );
    router.push("/explore");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl lg:text-5xl text-blue-500 font-semibold px-12 text-center">
        Are you sure?
      </h1>
      <br />
      <div className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">
        <p className="mt-4 text-center max-w-[400px]">
          If you&apos;ve changed your mind and would like to keep "
          {unentity(salon.name)}
          ",{" "}
          <Link href={`/explore/detail/${salon.id}`}>
            <a className="text-blue-500 font-semibold">
              return to the prior page
            </a>
          </Link>{" "}
          <br />
          <br />
          Otherwise, click the button below to confirm the irreversible
          decision.
        </p>
        <br />
        <form onSubmit={handleDelete}>
          <button className="btn bg-[#dd3444] hover:bg-[#ca2e3e] text-white font-semibold text-center">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const salon = await prisma.salon.findUnique({
    where: {
      id: query.id,
    },
  });

  return {
    props: { salon },
  };
}
