Cesium.Ion.defaultAccessToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMWI4OWFkZC1jYTFmLTQ0YmItYjY2MS1hNmNjMTQwZjI2YjEiLCJpZCI6MzQ4NDEzLCJpYXQiOjE3NTk5Mzc4OTl9.JQCIRBDvC2z9kNiThh-mog3sAMZ8Hbp116FlyUCv174
// Initialize Cesium Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain(),
  imageryProvider: new Cesium.OpenStreetMapImageryProvider({}),
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  animation: false,
  timeline: false,
  fullscreenButton: false,
  vrButton: false,
  infoBox: false,
  selectionIndicator: false,
});

// Make the globe look realistic
viewer.scene.globe.enableLighting = true;

// Initial camera view (entire Earth)
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(0, 0, 20000000),
  orientation: {
    heading: 0,
    pitch: Cesium.Math.toRadians(-30),
    roll: 0,
  },
});

// Coordinates for Tharparkar, Pakistan
const tharparkarCenter = Cesium.Cartesian3.fromDegrees(69.8, 24.8, 1500);

// Play background music
const music = document.getElementById("backgroundMusic");
music.volume = 0.3;
music.play().catch(() => {
  console.log("Autoplay blocked — click anywhere to start music.");
  document.body.addEventListener("click", () => music.play(), { once: true });
});

// Add cultural diversity markers
const entities = viewer.entities.addAll([
  {
    position: Cesium.Cartesian3.fromDegrees(69.7, 24.9, 500),
    point: { pixelSize: 10, color: Cesium.Color.YELLOW },
    billboard: {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Thar_Desert.jpg/320px-Thar_Desert.jpg",
      scale: 0.5,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
    label: {
      text: "Thar Desert Dunes\nVast golden sands, home to unique flora and fauna",
      font: "14pt sans-serif",
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20),
    },
  },
  {
    position: Cesium.Cartesian3.fromDegrees(70.0, 24.7, 500),
    point: { pixelSize: 10, color: Cesium.Color.ORANGE },
    billboard: {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sindhi_people.jpg/320px-Sindhi_people.jpg",
      scale: 0.5,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
    label: {
      text: "Thari People\nResilient communities of Hindus and Muslims",
      font: "14pt sans-serif",
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20),
    },
  },
  {
    position: Cesium.Cartesian3.fromDegrees(69.6, 24.6, 500),
    point: { pixelSize: 10, color: Cesium.Color.BLUE },
    billboard: {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Shrine_in_Tharparkar.jpg/320px-Shrine_in_Tharparkar.jpg",
      scale: 0.5,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
    label: {
      text: "Sufi Heritage\nAncient shrines and spiritual sites",
      font: "14pt sans-serif",
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20),
    },
  },
  {
    position: Cesium.Cartesian3.fromDegrees(69.9, 24.5, 500),
    point: { pixelSize: 10, color: Cesium.Color.GREEN },
    billboard: {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Camel_fair_in_Tharparkar.jpg/320px-Camel_fair_in_Tharparkar.jpg",
      scale: 0.5,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
    label: {
      text: "Cultural Traditions\nCamel fairs and intricate embroidery",
      font: "14pt sans-serif",
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20),
    },
  },
]);

// Hide entities initially
entities.values.forEach((entity) => (entity.show = false));

// Zoom into Tharparkar from space
viewer.camera.flyTo({
  destination: tharparkarCenter,
  duration: 15,
  easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
  complete: () => {
    entities.values.forEach((entity) => (entity.show = true));

    // Start smooth hover tour
    const tourPositions = [
      { lon: 69.7, lat: 24.9, alt: 2000, duration: 7 },
      { lon: 70.0, lat: 24.7, alt: 2000, duration: 7 },
      { lon: 69.6, lat: 24.6, alt: 2000, duration: 7 },
      { lon: 69.9, lat: 24.5, alt: 2000, duration: 7 },
    ];

    let index = 0;
    function nextView() {
      if (index >= tourPositions.length) index = 0;
      const pos = tourPositions[index];
      const dest = Cesium.Cartesian3.fromDegrees(pos.lon, pos.lat, pos.alt);
      viewer.camera.flyTo({
        destination: dest,
        duration: pos.duration,
        easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
        complete: () => {
          index++;
          nextView();
        },
      });
    }

    nextView(); // Begin the loop
  },
});
