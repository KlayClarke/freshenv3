import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { Salon } from "../../atoms/salonsAtom";
import dayjs from "dayjs";

type BookingFormProps = {
  salon: Salon;
};

const BookingForm: React.FC<BookingFormProps> = ({ salon }) => {
  const [formData, setFormData] = useState({
    date_time: "",
    description: "",
  });

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { date_time, description } = formData;
    await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + `/api/salons/book/${salon.id}`,
      {
        body: JSON.stringify({
          date_time: dayjs(date_time).toDate(),
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    router.push(`/explore/detail/${salon.id}`);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-center max-w-lg">
        <h1 className=" text-2xl md:text-4xl text-blue-500 font-semibold">
          Book An Appointment Today
        </h1>
      </div>
      <br />
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center"
      >
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date_time"
          >
            Booking Date & Time
          </label>
          <input
            title="booking date and time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            name="date_time"
            onChange={(e) => {
              setFormData({ ...formData, date_time: e.target.value });
            }}
            value={formData.date_time}
            type={"datetime-local"}
            required
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Brief Description
          </label>
          <input
            title="booking description"
            className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            name="description"
            onChange={(e) => {
              if (e.target.value.length <= 40) {
                setFormData({
                  ...formData,
                  description: e.target.value,
                });
              }
            }}
            value={formData.description}
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold border border-blue-500"
        >
          Book
        </button>
        <p className="mt-4">
          <Link href={`/explore/detail/${salon.id}`}>
            <a className="text-blue-500">Cancel</a>
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
