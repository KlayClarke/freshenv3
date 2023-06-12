export type Geometry = {
  type: string;
  coordinates: number[];
};

export type Salon = {
  geometry: Geometry;
  coordinates: [number, number];
  id: string;
  name: string;
  type: string;
  average_price: number;
  image: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  properties: {
    mapboxClusterHTML: string;
  };
  author_id: string;
};

export type ApiFormattedSalon = {
	geometry: Geometry;
	coordinates: [number, number];
	id: string;
	name: string;
	type: string; // Mapbox's GeoJSON format expects a type of "Feature" for each Feature (Salon) in FeatureCollection (Salon Api Get Response) (In other words, this is changed for Mapbox compliance concerns)
	salon_type: string; // This salon_type value acts as the salon's "type" value (as specified in MongoDB and Prisma schema 
						// Needed to redefine salon "type" value to comply with Mapbox GeoJSON expectations
	average_price: number;
	image: string;
	street_address: string;
	city: string;
	state: string;
	zip_code: string;
	properties: {
		mapboxClusterHTML: string;
	};
	author_id: string;
}