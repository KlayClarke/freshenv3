import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const salons = await prisma.salon.findMany({});

  const formattedData = [];

  salons.map((salon) => {
    const formattedSalon = {};

    formattedSalon.geometry = { type: "Point", coordinates: salon.coordinates };
    formattedSalon.id = salon.id;
    formattedSalon.name = salon.name;
    formattedSalon.type = salon.type;
    formattedSalon.average_price = salon.average_price;
    formattedSalon.image = salon.image;
    formattedSalon.street_address = salon.street_address;
    formattedSalon.city = salon.city;
    formattedSalon.state = salon.state;
    formattedSalon.zip_code = salon.zip_code;
    formattedSalon.properties = {
      mapboxClusterHTML:
        "<h3 class='text-center'><a href=" +
        `/explore/detail/${salon.id}` +
        " class='text-2xl text-blue-500'>" +
        salon.name +
        "</a></h3>",
    };

    formattedData.push(formattedSalon);
  });

  res.status(200).json({ features: formattedData });
}
