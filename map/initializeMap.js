export default function initializeMap(mapboxgl, map) {
  // inspect a cluster on click
  map.on("click", "cluster", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["cluster"],
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource("salons").getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;
      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom,
      });
    });
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );
  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });
}
