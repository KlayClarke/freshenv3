import prisma from "../../../../lib/prisma";
import BookingForm from "../../../../components/Salons/BookingForm";

export default function Book({ salon }) {
  return <BookingForm salon={salon} />;
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
