import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export default function Dashboard() {
  const [shops, setShops] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { data: session, status } = useSession();

  const { data: salons, error: salons_err } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );

  const { data: appts, error: appts_err } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/appointments/get",
    fetcher
  );

  //   function getShops(id) {
  //     s = []
  //     for (let salon in salons: Salon) {

  //     }
  //   }
  function getAppointments(id) {
    let appointments = [];
    for (let appt of appts) {
      if (appt["id"] === id) {
        console.log(appt);
      }
    }
  }

  useEffect(() => {
    getAppointments(session.user.id);
  });

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <div className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">
        <h3 className="text-bold underline">Your Shops</h3>
      </div>
      <div className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">
        <h3 className="text-bold underline">Your Appointments</h3>
      </div>
    </div>
  );
}
