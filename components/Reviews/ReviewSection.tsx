import { Review, Salon, Session } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useRouter, Router } from "next/router";
import unEntity from "../../utils/unentity";
import sanitize from "sanitize-html";

type ReviewSectionProps = {
  salon: Salon;
  reviews: [];
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ salon, reviews }) => {
  const [rating, setRating] = useState(3);
  const [body, setBody] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id: salon_id } = router.query;

  function onRatingChange(event: any) {
    setRating(event.target.value);
  }

  async function handleReviewCreation(event: any) {
    event.preventDefault();
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/reviews/create",
      {
        body: JSON.stringify({
          rating,
          body,
          salon_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    setBody("");
    router.push(`/explore/detail/${salon.id}`);
  }

  async function handleReviewDeletion(event: any, id: string) {
    event.preventDefault();
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + `/api/reviews/delete/${id}`,
      {
        method: "POST",
      }
    );
    router.push(`/explore/detail/${salon.id}`);
  }

  useEffect(() => {
    console.log(session);
  }, []);
  return (
    <div className="relative mt-20 lg:mt-24 px-5">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-24">
        {/* content */}
        <div className="flex flex-1 flex-col items-center">
          <div className="relative mt-20 lg:mt-24 bg-white rounded-lg shadow-sm border p-5">
            <div className="container mx-auto flex flex-col items-center justify-center gap-x-24 w-full">
              {session && session.user ? (
                <>
                  <form
                    className="flex flex-col justify-center items-center gap-6 lg:w-[80%]"
                    onSubmit={handleReviewCreation}
                  >
                    <fieldset
                      className="starability-basic"
                      onChange={onRatingChange}
                    >
                      <input
                        type="radio"
                        id="first-rate1"
                        name="rating"
                        value="1"
                        required
                      />
                      <label htmlFor="first-rate1" title="Terrible">
                        1 star
                      </label>
                      <input
                        type="radio"
                        id="first-rate2"
                        name="rating"
                        value="2"
                        required
                      />
                      <label htmlFor="first-rate2" title="Not good">
                        2 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate3"
                        name="rating"
                        value="3"
                        required
                        defaultChecked
                      />
                      <label htmlFor="first-rate3" title="Average">
                        3 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate4"
                        name="rating"
                        value="4"
                        required
                      />
                      <label htmlFor="first-rate4" title="Very good">
                        4 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate5"
                        name="rating"
                        value="5"
                        required
                      />
                      <label htmlFor="first-rate5" title="Amazing">
                        5 stars
                      </label>
                    </fieldset>
                    <textarea
                      title="body"
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50  w-[100%] lg:h-44"
                      required
                      onChange={(e) => {
                        setBody(e.target.value);
                      }}
                      value={body}
                    />
                    <button
                      type="submit"
                      className="btn bg-green-500 hover:bg-green-600 text-white font-semibold border border-green-500"
                    >
                      Submit
                    </button>
                  </form>
                </>
              ) : (
                <h1 className="text-gray-500 underline text-xl text-center border-b">
                  You must log in to leave a review
                </h1>
              )}
              {/* content */}
              <div className="flex flex-1 flex-col items-center w-[100%]">
                {reviews
                  .slice(0)
                  .reverse()
                  .map((review, id) => (
                    <div key={id} className="review px-5 pt-5 w-full">
                      <p className="font-bold">
                        {unEntity(sanitize(review.author.name.split(" ")[0]))} -{" "}
                        {unEntity(sanitize(review.rating))}
                      </p>
                      <p className="text-lg mb-5 mt-5">
                        {unEntity(sanitize(review.body))}
                      </p>
                      {session && session.user_id === review.author_id && (
                        <>
                          <form
                            className="flex justify-end"
                            onSubmit={(e) => handleReviewDeletion(e, review.id)}
                          >
                            <button
                              title="review delete"
                              type="submit"
                              className="btn-small.bg-[#dd3444].hover:bg-[#ca2e3e].text-white.font-semibold.text-center"
                            >
                              X
                            </button>
                          </form>
                        </>
                      )}
                      <br />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewSection;
