import prisma from "../../../lib/prisma";
import Cors from "cors";
import NextCors from "nextjs-cors";
import { ApiFormattedSalon, Salon } from "../../../atoms/salonsAtom";
import { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "../../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// export default async function handler(req, res) {
//   // Run cors
//   await cors(req, res);

//   // Rest of the API logic
//   res.json({ message: "Hello Everyone!" });
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // run cors
  await cors(req, res);

  const salons = (await prisma.salon.findMany({})) as Salon[];

  const formattedData = [];

  salons.map((salon: Salon) => {
    const formattedSalon = {} as ApiFormattedSalon;

    formattedSalon.geometry = {
      type: "Point",
      coordinates: salon.coordinates,
    };
    formattedSalon.id = salon.id;
    formattedSalon.name = salon.name;
    formattedSalon.type = "Feature";
	formattedSalon.salon_type = salon.type;
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
        " class='text-2xl text-blue-500 underline'>" +
        salon.name +
        "</a></h3>",
    };

    formattedData.push(formattedSalon);
  });

  // Crafting a JSON format to comply with GeoJSON format -> https://geojson.org/
	// {
	// 	type: "FeatureCollection",
	// 	crs: {
	// 		type: "name",
	// 		properties: {
	// 			name: "urn:ogc:def:crs:OGC:1.3:CRS84"
	// 		},
	// 		features: [
	// 			{
	// 				salon data
	// 			}
	// 		]
	// 	}
	// }
  res.json({
	type: "FeatureCollection",
	crs: {
		type: "name",
		properties: {
			name: "urn:ogc:def:crs:OGC:1.3:CRS84"
		}
	},
	features: formattedData
  });
}
