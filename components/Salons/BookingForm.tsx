import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { Salon } from "../../atoms/salonsAtom";

type BookingFormProps = {
  salon: Salon;
};

const BookingForm: React.FC<BookingFormProps> = ({ salon }) => {
  const [formData, setFormData] = useState({
    booking_datetime: "",
    booking_description: "",
  });
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { booking_datetime, booking_description } = formData;
    await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + `/api/salons/book/${salon.id}`,
      {
        body: JSON.stringify({
          booking_datetime,
          booking_description,
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
            htmlFor="booking_time"
          >
            Booking Date & Time
          </label>
          <input
            title="booking time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            name="booking_time"
            onChange={(e) => {
              setFormData({ ...formData, booking_datetime: e.target.value });
            }}
            value={formData.booking_datetime}
            type={"datetime-local"}
            required
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="booking_description"
          >
            Brief Description
          </label>
          <input
            title="booking description"
            className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            name="booking_description"
            onChange={(e) => {
              if (e.target.value.length <= 40) {
                setFormData({
                  ...formData,
                  booking_description: e.target.value,
                });
              }
            }}
            value={formData.booking_description}
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
