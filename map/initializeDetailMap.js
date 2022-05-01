export default function initializeDetailMap(mapboxgl, map, salon) {
  map.addControl(new mapboxgl.FullscreenControl());
  const marker1 = new mapboxgl.Marker()
    .setLngLat(salon.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(`<h2>${salon.name}</h2>`)
    )
    .addTo(map);

  map.on("style.load", () => {
    map.addControl(new mapboxgl.NavigationControl());
  });
}
