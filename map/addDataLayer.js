export default function addDataLayer(map, salons) {
  map.addSource("salons", {
    type: "geojson",
    data: salons,
    cluster: true,
    clusterMaxZoom: 20,
    clusterRadius: 50,
  });

  map.addLayer({
    id: "cluster",
    type: "circle",
    source: "salons",
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      "circle-color": [
        "step",
        ["get", "point_count"],
        "orange",
        20,
        "green",
        40,
        "red",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 20, 30, 40, 40],
    },
  });
  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "salons",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{sum}",
      "text-font": ["Open Sans Bold"],
      "text-size": 16,
    },
    paint: {
      "text-color": "white",
    },
  });
  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "salons",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 10,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
}
