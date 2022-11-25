import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Appointment } from "../../atoms/appointmentsAtom";
import { Salon } from "../../atoms/salonsAtom";
import prisma from "../../lib/prisma";
import Link from "next/link";

type DashboardProps = {
  shops: Salon[];
  appts: Appointment[];
};

export default function Dashboard({ shops, appts }: DashboardProps) {
  const [fetched, setFetched] = useState(false);
  const [salons, setSalons] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    let res: Salon[] = [];
    for (let shop of shops) {
      if (shop.author_id === session.user.id) res.push(shop);
    }
    setSalons(res);
  }, [shops, session.user.id]);

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <div className="bg-white shadow-sm border rounded-lg px-8 pt-8 pb-8 mb-4 flex flex-col justify-center w-full">
        {salons.length === 0 ? (
          <>
            {" "}
            <h3>
              You currently have no shops. {""}
              <Link href="/explore/create">
                <a className="font-bold text-green-500">
                  Would you like to create one?
                </a>
              </Link>
            </h3>{" "}
          </>
        ) : (
          <>
            <h1 className="font-bold">Your Shops</h1>
            <div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              #
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Address
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Average Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {salons.map((salon: Salon, index) => (
                            <>
                              <tr className="odd:bg-white even:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <Link href={`/explore/detail/${salon.id}`}>
                                    <a className="text-blue-500 hover:underline">
                                      {salon.name}
                                    </a>
                                  </Link>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {salon.street_address}, {salon.city},{" "}
                                  {salon.state} {salon.zip_code}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  ${salon.average_price}
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="bg-white shadow-sm border rounded-lg px-8 pt-8 pb-8 mb-4 flex flex-col justify-center w-full">
        {appointments.length === 0 ? (
          <>
            <h3>
              You currently have no booked appointments.{" "}
              <Link href="/explore">
                <a className="font-bold text-blue-500">
                  Explore our database and find the right shop for you.
                </a>
              </Link>
            </h3>
          </>
        ) : (
          <>
            <h1 className="font-bold">Your Appointments</h1>
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const shops = await prisma.salon.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  //   const appts = await prisma.appointment.findMany();
  return {
    props: { shops },
  };
}
