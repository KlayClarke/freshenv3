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
