import prisma from "../../../../lib/prisma";
import SalonForm from "../../../../components/Salons/SalonForm";

export default function SalonEdit({ salon }) {
  return <SalonForm salon={salon} />;
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
