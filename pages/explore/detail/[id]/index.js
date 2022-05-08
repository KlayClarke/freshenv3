import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import initializeClusterMap from "../../../../map/initializeClusterMap";
import useSWR from "swr";
import { fetcher } from "../../../../utils/fetcher";
import prisma from "../../../../lib/prisma";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import unentity from "../../../../utils/unentity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// todo: render mapbox map on explore detail page

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Detail({ salon }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const [rating, setRating] = useState(3);
  const [body, setBody] = useState("");
  const { data: session, status } = useSession();
  const { data: salons, error } = useSWR(
    process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/get",
    fetcher
  );
  const router = useRouter();
  const { id: salon_id } = router.query;

  async function handleReviewCreation(e) {
    e.preventDefault();
    const res = await fetch(
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
    router.push(`/explore/detail/${salon_id}`);
  }

  useEffect(() => {
    console.log({ rating, body });
  }, [rating, body]);

  useEffect(() => {
    setPageIsMounted(true);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: salon.coordinates,
      zoom: 16,
    });

    setMap(map);
  }, [salon.coordinates]);

  useEffect(() => {
    if (pageIsMounted && salons) {
      Map.on("load", () => {
        initializeClusterMap(mapboxgl, Map, salons);
      });
    }
  }, [pageIsMounted, salons, Map, salon.coordinates]);

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[1400px]">
        {/* hero */}
        <section className="relative">
          <div id="map" className="h-[200px] lg:h-[300px] lg:w-full"></div>
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center mt-10 px-10"></div>
        </section>
        {/* features */}
        <section className="flex flex-col items-center">
          <div className="px-1 md:px-10 lg:py-10 flex flex-col justify-center items-center w-full">
            {/* feature 1 */}
            <div className="w-[100%]">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="flex flex-col">
                  <div>
                    <img
                      className="h-36 sm:h-60 xl:h-80 w-full object-cover"
                      src={
                        salon.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                      }
                      alt="shop"
                      layout="fill"
                    />
                  </div>
                  <div className="p-1.5 sm:p-4 lg:p-6">
                    <div className="uppercase tracking-wide font-semibold">
                      <p className="text-xs sm:text-sm text-blue-500 md:w-[80%]">
                        {unentity(sanitizeHtml(salon.type))}
                      </p>
                      <p className="text-sm sm:text-md text-green-600 md:w-[80%]">
                        ${unentity(sanitizeHtml(salon.average_price))}
                      </p>
                    </div>
                    <p className="block mt-1 text-sm sm:text-md leading-tight font-medium text-black md:max-w-[80%] truncate">
                      {unentity(sanitizeHtml(salon.name))}
                    </p>
                    <p className="text-sm sm:text-md mt-2 text-slate-500 h-fit md:max-w-[80%] truncate">
                      {unentity(sanitizeHtml(salon.street_address))}{" "}
                      {unentity(sanitizeHtml(salon.city))},{" "}
                      {unentity(sanitizeHtml(salon.state))}{" "}
                      {unentity(sanitizeHtml(salon.zip_code))}
                    </p>
                    {status === "authenticated" &&
                      session.user_id === salon.author_id && (
                        <>
                          <div className="py-2 flex gap-4">
                            <Link href={`/explore/detail/${salon.id}/edit`}>
                              <a className="btn bg-[#ffc006] hover:bg-[#ffc106d9] text-white font-semibold text-center">
                                Edit
                              </a>
                            </Link>
                            <Link
                              href={`/explore/detail/${salon.id}/delete_confirm`}
                            >
                              <a className="btn bg-[#dd3444] hover:bg-[#ca2e3e] text-white font-semibold text-center">
                                Delete
                              </a>
                            </Link>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
              <div className="relative mt-20 lg:mt-24 bg-white rounded-lg shadow-sm border p-5">
                <div className="container mx-auto flex flex-col items-center justify-center gap-x-24 w-full ">
                  <form
                    className="flex flex-col justify-center items-center gap-6 lg:w-[80%]"
                    onSubmit={handleReviewCreation}
                  >
                    {/* <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={48}
                      color2={"#ffd700"}
                    /> */}
                    <fieldset
                      className="starability-basic"
                      onChange={(e) => setRating(e.target.value)}
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
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50  w-[100%] lg:h-44"
                      required
                      onChange={(e) => {
                        setBody(e.target.value);
                      }}
                    />
                    <button className="btn bg-green-500 hover:bg-green-600 text-white font-semibold border border-green-500">
                      Submit
                    </button>
                  </form>
                  {/* content */}
                  <div className="flex flex-1 flex-col items-center">
                    <div className="review p-5">
                      <p className="font-bold">Author name - 5/5</p>
                      <p className="text-lg mb-5 mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis non congue purus, sed feugiat lorem. Cras in orci
                        ac enim varius porttitor. Integer fermentum sapien
                        lectus, non interdum velit imperdiet eget. Interdum et
                        malesuada fames ac ante ipsum primis in faucibus. Duis
                        mattis leo vel pulvinar iaculis. Sed consequat massa
                        elementum fringilla gravida. Donec tincidunt aliquam
                        imperdiet. Ut interdum dui risus, ac molestie libero
                        faucibus sit amet. Aenean vel tincidunt lorem. Donec nec
                        metus vel enim pulvinar varius. Curabitur metus ex,
                        aliquet sit amet velit maximus, cursus dignissim ipsum.
                        Etiam tincidunt elit vel ex commodo, euismod convallis
                        sem ullamcorper. Morbi elementum felis urna, et
                        facilisis elit tempus eget. Sed semper id turpis ac
                        placerat. Nam quam purus, luctus in rutrum vel,
                        fringilla sit amet sapien. Nulla facilisi. Etiam sodales
                        odio elit, a iaculis mauris blandit ac. Morbi lacinia,
                        est ac pharetra tempor, est est consectetur justo, et
                        lobortis lacus sem non risus. Nullam sodales urna ac
                        fermentum ullamcorper. In dui lorem, tempor et ipsum
                        eget, scelerisque rutrum libero. Nullam non interdum
                        magna. Vivamus aliquam dui in elit malesuada placerat.
                        Proin pulvinar purus sit amet magna accumsan accumsan.
                        Vivamus eget orci euismod, tempus nibh quis, suscipit
                        mi. Orci varius natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus. Nulla quis
                        tempus arcu, sit amet consequat eros. Etiam cursus nibh
                        non augue elementum, sed pretium augue porttitor.
                        Praesent gravida, metus a rhoncus venenatis, ex nulla
                        tempus mauris, eget tincidunt risus dolor sed felis. Ut
                        dui metus, volutpat at est non, porta malesuada metus.
                        Integer sem nisl, laoreet aliquam placerat quis,
                        tincidunt in ipsum. Maecenas ac ipsum vitae justo tempus
                        blandit eu in ante. Duis aliquet efficitur augue, ac
                        aliquet ligula imperdiet venenatis. Sed a dui ante.
                        Vestibulum eros metus, lobortis at mattis at, pretium
                        non tellus. Nulla mi dui, feugiat sed blandit tempus,
                        aliquam ut tortor. Praesent lacinia porttitor arcu id
                        vestibulum. Proin iaculis sollicitudin dui. Donec quis
                        lectus at tellus ultrices ullamcorper. Interdum et
                        malesuada fames ac ante ipsum primis in faucibus.
                        Suspendisse luctus iaculis ligula vitae tincidunt.
                        Phasellus tincidunt elementum metus, et egestas metus
                        rutrum id. Integer pellentesque metus vel pellentesque
                        tincidunt. Proin dictum scelerisque ante non
                        pellentesque. Aliquam fermentum tempor pellentesque.
                        Nullam vitae turpis vitae libero tempus interdum. Morbi
                        quis tellus et magna imperdiet viverra. Nulla eget
                        ultricies arcu. Nunc commodo semper ligula ut consequat.
                        Donec dapibus tincidunt leo. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Praesent erat magna,
                        vehicula vitae diam vel, condimentum fringilla erat.
                        Cras tincidunt est in tristique feugiat. Mauris maximus
                        purus urna, sit amet commodo neque fermentum ac. Mauris
                        convallis vestibulum turpis a laoreet. Nulla magna
                        tellus, tristique vulputate elit eu, vehicula bibendum
                        ipsum. Donec lectus dui, vehicula sit amet pharetra ac,
                        sagittis eget eros. Proin feugiat laoreet accumsan.
                        Etiam vulputate sed mauris nec lobortis. Donec dictum ac
                        metus eu tincidunt.
                      </p>
                      <Link href={`#`}>
                        <a className="btn bg-[#dd3444] hover:bg-[#ca2e3e] text-white font-semibold text-center">
                          Delete
                        </a>
                      </Link>
                      <br />
                    </div>
                    <div className="review p-5">
                      <p className="font-bold">Author name - 5/5</p>
                      <p className="text-lg mb-5 mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis non congue purus, sed feugiat lorem. Cras in orci
                        ac enim varius porttitor. Integer fermentum sapien
                        lectus, non interdum velit imperdiet eget. Interdum et
                        malesuada fames ac ante ipsum primis in faucibus. Duis
                        mattis leo vel pulvinar iaculis. Sed consequat massa
                        elementum fringilla gravida. Donec tincidunt aliquam
                        imperdiet. Ut interdum dui risus, ac molestie libero
                        faucibus sit amet. Aenean vel tincidunt lorem. Donec nec
                        metus vel enim pulvinar varius. Curabitur metus ex,
                        aliquet sit amet velit maximus, cursus dignissim ipsum.
                        Etiam tincidunt elit vel ex commodo, euismod convallis
                        sem ullamcorper. Morbi elementum felis urna, et
                        facilisis elit tempus eget. Sed semper id turpis ac
                        placerat. Nam quam purus, luctus in rutrum vel,
                        fringilla sit amet sapien. Nulla facilisi. Etiam sodales
                        odio elit, a iaculis mauris blandit ac. Morbi lacinia,
                        est ac pharetra tempor, est est consectetur justo, et
                        lobortis lacus sem non risus. Nullam sodales urna ac
                        fermentum ullamcorper. In dui lorem, tempor et ipsum
                        eget, scelerisque rutrum libero. Nullam non interdum
                        magna. Vivamus aliquam dui in elit malesuada placerat.
                        Proin pulvinar purus sit amet magna accumsan accumsan.
                        Vivamus eget orci euismod, tempus nibh quis, suscipit
                        mi. Orci varius natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus. Nulla quis
                        tempus arcu, sit amet consequat eros. Etiam cursus nibh
                        non augue elementum, sed pretium augue porttitor.
                        Praesent gravida, metus a rhoncus venenatis, ex nulla
                        tempus mauris, eget tincidunt risus dolor sed felis. Ut
                        dui metus, volutpat at est non, porta malesuada metus.
                        Integer sem nisl, laoreet aliquam placerat quis,
                        tincidunt in ipsum. Maecenas ac ipsum vitae justo tempus
                        blandit eu in ante. Duis aliquet efficitur augue, ac
                        aliquet ligula imperdiet venenatis. Sed a dui ante.
                        Vestibulum eros metus, lobortis at mattis at, pretium
                        non tellus. Nulla mi dui, feugiat sed blandit tempus,
                        aliquam ut tortor. Praesent lacinia porttitor arcu id
                        vestibulum. Proin iaculis sollicitudin dui. Donec quis
                        lectus at tellus ultrices ullamcorper. Interdum et
                        malesuada fames ac ante ipsum primis in faucibus.
                        Suspendisse luctus iaculis ligula vitae tincidunt.
                        Phasellus tincidunt elementum metus, et egestas metus
                        rutrum id. Integer pellentesque metus vel pellentesque
                        tincidunt. Proin dictum scelerisque ante non
                        pellentesque. Aliquam fermentum tempor pellentesque.
                        Nullam vitae turpis vitae libero tempus interdum. Morbi
                        quis tellus et magna imperdiet viverra. Nulla eget
                        ultricies arcu. Nunc commodo semper ligula ut consequat.
                        Donec dapibus tincidunt leo. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Praesent erat magna,
                        vehicula vitae diam vel, condimentum fringilla erat.
                        Cras tincidunt est in tristique feugiat. Mauris maximus
                        purus urna, sit amet commodo neque fermentum ac. Mauris
                        convallis vestibulum turpis a laoreet. Nulla magna
                        tellus, tristique vulputate elit eu, vehicula bibendum
                        ipsum. Donec lectus dui, vehicula sit amet pharetra ac,
                        sagittis eget eros. Proin feugiat laoreet accumsan.
                        Etiam vulputate sed mauris nec lobortis. Donec dictum ac
                        metus eu tincidunt.
                      </p>
                      <Link href={`#`}>
                        <a className="btn bg-[#dd3444] hover:bg-[#ca2e3e] text-white font-semibold text-center">
                          Delete
                        </a>
                      </Link>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
