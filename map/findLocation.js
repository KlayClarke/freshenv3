import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const mbxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

export default async function findLocation(
  streetAddress,
  city,
  state,
  zipCode
) {
  const fullAddress = `${streetAddress} ${city}, ${state} ${zipCode}`;
  const geoData = await geocoder
    .forwardGeocode({
      query: fullAddress,
      limit: 1,
    })
    .send()
    .then((res) => {
      return res;
    });

  const geoJSON = await JSON.parse(geoData.request.response.rawBody);
  const geometry = geoJSON["features"][0]["geometry"];
  const coordinates = geometry.coordinates;
  const long = parseFloat(coordinates[0]);
  const lat = parseFloat(coordinates[1]);
  const longlat = [long, lat];
  return longlat;
}
