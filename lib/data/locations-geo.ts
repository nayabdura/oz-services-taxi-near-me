export type GeoLocationConfig = {
  name: string;
  state: string;
  stateSlug: string;
  citySlug?: string;
  lat: number;
  lng: number;
  zoom: number;
  serviceRadiusMeters: number; // For Leaflet Circle service area
  airport?: {
    name: string;
    code: string;
    lat: number;
    lng: number;
  };
};

export const STATE_GEO_DATA: Record<string, { lat: number; lng: number; zoom: number }> = {
  alabama: { lat: 32.806671, lng: -86.79113, zoom: 7 },
  alaska: { lat: 61.370716, lng: -152.404419, zoom: 5 },
  arizona: { lat: 33.729759, lng: -111.431221, zoom: 7 },
  arkansas: { lat: 34.969704, lng: -92.373123, zoom: 7 },
  california: { lat: 36.778261, lng: -119.417932, zoom: 6 },
  colorado: { lat: 39.059811, lng: -105.311104, zoom: 7 },
  connecticut: { lat: 41.597782, lng: -72.755371, zoom: 9 },
  delaware: { lat: 39.318523, lng: -75.507141, zoom: 9 },
  florida: { lat: 27.766279, lng: -81.686783, zoom: 7 },
  georgia: { lat: 33.040619, lng: -83.643074, zoom: 7 },
  hawaii: { lat: 21.09431, lng: -157.498337, zoom: 7 },
  idaho: { lat: 44.240459, lng: -114.478828, zoom: 6 },
  illinois: { lat: 40.349457, lng: -88.986137, zoom: 7 },
  indiana: { lat: 39.849426, lng: -86.258278, zoom: 7 },
  iowa: { lat: 42.011539, lng: -93.210526, zoom: 7 },
  kansas: { lat: 38.5266, lng: -96.726486, zoom: 7 },
  kentucky: { lat: 37.66814, lng: -84.670067, zoom: 7 },
  louisiana: { lat: 31.169546, lng: -91.867805, zoom: 7 },
  maine: { lat: 44.693947, lng: -69.381927, zoom: 7 },
  maryland: { lat: 39.063946, lng: -76.802101, zoom: 8 },
  massachusetts: { lat: 42.230171, lng: -71.530106, zoom: 8 },
  michigan: { lat: 43.326618, lng: -84.536095, zoom: 7 },
  minnesota: { lat: 45.694454, lng: -93.900192, zoom: 6 },
  mississippi: { lat: 32.741646, lng: -89.678696, zoom: 7 },
  missouri: { lat: 38.456085, lng: -92.288368, zoom: 7 },
  montana: { lat: 46.921925, lng: -110.454353, zoom: 6 },
  nebraska: { lat: 41.12537, lng: -98.268082, zoom: 7 },
  nevada: { lat: 38.313515, lng: -117.055374, zoom: 6 },
  "new-hampshire": { lat: 43.452492, lng: -71.563896, zoom: 8 },
  "new-jersey": { lat: 40.29896, lng: -74.521011, zoom: 8 },
  "new-mexico": { lat: 34.840515, lng: -106.248482, zoom: 7 },
  "new-york": { lat: 42.165726, lng: -74.948051, zoom: 7 },
  "north-carolina": { lat: 35.630066, lng: -79.806419, zoom: 7 },
  "north-dakota": { lat: 47.528912, lng: -99.784012, zoom: 7 },
  ohio: { lat: 40.388783, lng: -82.764915, zoom: 7 },
  oklahoma: { lat: 35.565342, lng: -96.928917, zoom: 7 },
  oregon: { lat: 44.572021, lng: -122.070938, zoom: 7 },
  pennsylvania: { lat: 40.590752, lng: -77.209755, zoom: 7 },
  "rhode-island": { lat: 41.680893, lng: -71.51178, zoom: 9 },
  "south-carolina": { lat: 33.856892, lng: -80.945007, zoom: 7 },
  "south-dakota": { lat: 44.299782, lng: -99.438828, zoom: 7 },
  tennessee: { lat: 35.747845, lng: -86.692345, zoom: 7 },
  texas: { lat: 31.054487, lng: -97.563461, zoom: 6 },
  utah: { lat: 39.32098, lng: -111.093731, zoom: 7 },
  vermont: { lat: 44.045876, lng: -72.710686, zoom: 8 },
  virginia: { lat: 37.769337, lng: -78.169968, zoom: 7 },
  washington: { lat: 47.400902, lng: -121.490494, zoom: 7 },
  "west-virginia": { lat: 38.491226, lng: -80.954453, zoom: 7 },
  wisconsin: { lat: 44.268543, lng: -89.616508, zoom: 7 },
  wyoming: { lat: 42.755966, lng: -107.30249, zoom: 7 },
};

export const CITY_GEO_DATA: Record<string, GeoLocationConfig> = {
  // New York
  "new-york": {
    name: "New York",
    state: "New York",
    stateSlug: "new-york",
    citySlug: "new-york",
    lat: 40.7128,
    lng: -74.006,
    zoom: 12,
    serviceRadiusMeters: 20000,
    airport: { name: "John F. Kennedy International Airport", code: "JFK", lat: 40.6413, lng: -73.7781 },
  },
  brooklyn: {
    name: "Brooklyn",
    state: "New York",
    stateSlug: "new-york",
    citySlug: "brooklyn",
    lat: 40.6782,
    lng: -73.9442,
    zoom: 12,
    serviceRadiusMeters: 15000,
  },
  queens: {
    name: "Queens",
    state: "New York",
    stateSlug: "new-york",
    citySlug: "queens",
    lat: 40.7282,
    lng: -73.7949,
    zoom: 12,
    serviceRadiusMeters: 18000,
    airport: { name: "LaGuardia Airport", code: "LGA", lat: 40.7769, lng: -73.874 },
  },
  manhattan: {
    name: "Manhattan",
    state: "New York",
    stateSlug: "new-york",
    citySlug: "manhattan",
    lat: 40.7831,
    lng: -73.9712,
    zoom: 13,
    serviceRadiusMeters: 12000,
  },
  bronx: {
    name: "Bronx",
    state: "New York",
    stateSlug: "new-york",
    citySlug: "bronx",
    lat: 40.8448,
    lng: -73.8648,
    zoom: 12,
    serviceRadiusMeters: 15000,
  },

  // Florida
  orlando: {
    name: "Orlando",
    state: "Florida",
    stateSlug: "florida",
    citySlug: "orlando",
    lat: 28.5383,
    lng: -81.3792,
    zoom: 11,
    serviceRadiusMeters: 30000,
    airport: { name: "Orlando International Airport", code: "MCO", lat: 28.4312, lng: -81.3081 },
  },
  miami: {
    name: "Miami",
    state: "Florida",
    stateSlug: "florida",
    citySlug: "miami",
    lat: 25.7617,
    lng: -80.1918,
    zoom: 11,
    serviceRadiusMeters: 25000,
    airport: { name: "Miami International Airport", code: "MIA", lat: 25.7959, lng: -80.287 },
  },
  tampa: {
    name: "Tampa",
    state: "Florida",
    stateSlug: "florida",
    citySlug: "tampa",
    lat: 27.9506,
    lng: -82.4572,
    zoom: 11,
    serviceRadiusMeters: 25000,
    airport: { name: "Tampa International Airport", code: "TPA", lat: 27.9772, lng: -82.5311 },
  },
  "fort-lauderdale": {
    name: "Fort Lauderdale",
    state: "Florida",
    stateSlug: "florida",
    citySlug: "fort-lauderdale",
    lat: 26.1224,
    lng: -80.1373,
    zoom: 12,
    serviceRadiusMeters: 20000,
    airport: { name: "Fort Lauderdale-Hollywood Airport", code: "FLL", lat: 26.0742, lng: -80.1506 },
  },

  // Illinois
  chicago: {
    name: "Chicago",
    state: "Illinois",
    stateSlug: "illinois",
    citySlug: "chicago",
    lat: 41.8781,
    lng: -87.6298,
    zoom: 11,
    serviceRadiusMeters: 30000,
    airport: { name: "O'Hare International Airport", code: "ORD", lat: 41.9742, lng: -87.9073 },
  },

  // California
  "los-angeles": {
    name: "Los Angeles",
    state: "California",
    stateSlug: "california",
    citySlug: "los-angeles",
    lat: 34.0522,
    lng: -118.2437,
    zoom: 10,
    serviceRadiusMeters: 40000,
    airport: { name: "Los Angeles International Airport", code: "LAX", lat: 33.9416, lng: -118.4085 },
  },
  "san-francisco": {
    name: "San Francisco",
    state: "California",
    stateSlug: "california",
    citySlug: "san-francisco",
    lat: 37.7749,
    lng: -122.4194,
    zoom: 12,
    serviceRadiusMeters: 20000,
    airport: { name: "San Francisco International Airport", code: "SFO", lat: 37.6213, lng: -122.379 },
  },

  // Texas
  houston: {
    name: "Houston",
    state: "Texas",
    stateSlug: "texas",
    citySlug: "houston",
    lat: 29.7604,
    lng: -95.3698,
    zoom: 10,
    serviceRadiusMeters: 35000,
    airport: { name: "George Bush Intercontinental Airport", code: "IAH", lat: 29.9902, lng: -95.3368 },
  },
  dallas: {
    name: "Dallas",
    state: "Texas",
    stateSlug: "texas",
    citySlug: "dallas",
    lat: 32.7767,
    lng: -96.797,
    zoom: 11,
    serviceRadiusMeters: 30000,
    airport: { name: "Dallas/Fort Worth International Airport", code: "DFW", lat: 32.8998, lng: -97.0403 },
  },
  austin: {
    name: "Austin",
    state: "Texas",
    stateSlug: "texas",
    citySlug: "austin",
    lat: 30.2672,
    lng: -97.7431,
    zoom: 11,
    serviceRadiusMeters: 25000,
    airport: { name: "Austin-Bergstrom International Airport", code: "AUS", lat: 30.1975, lng: -97.6664 },
  },

  // Georgia
  atlanta: {
    name: "Atlanta",
    state: "Georgia",
    stateSlug: "georgia",
    citySlug: "atlanta",
    lat: 33.749,
    lng: -84.388,
    zoom: 11,
    serviceRadiusMeters: 30000,
    airport: { name: "Hartsfield-Jackson Atlanta International", code: "ATL", lat: 33.6407, lng: -84.4277 },
  },

  // Nevada
  "las-vegas": {
    name: "Las Vegas",
    state: "Nevada",
    stateSlug: "nevada",
    citySlug: "las-vegas",
    lat: 36.1699,
    lng: -115.1398,
    zoom: 12,
    serviceRadiusMeters: 25000,
    airport: { name: "Harry Reid International Airport", code: "LAS", lat: 36.084, lng: -115.1537 },
  },

  // Washington
  seattle: {
    name: "Seattle",
    state: "Washington",
    stateSlug: "washington",
    citySlug: "seattle",
    lat: 47.6062,
    lng: -122.3321,
    zoom: 11,
    serviceRadiusMeters: 25000,
    airport: { name: "Seattle-Tacoma International Airport", code: "SEA", lat: 47.4502, lng: -122.3088 },
  },
};

export function getLocationGeoData(stateSlug: string, citySlug?: string): GeoLocationConfig {
  const cleanCity = citySlug ? citySlug.replace("taxi-in-", "").toLowerCase() : "";
  if (cleanCity && CITY_GEO_DATA[cleanCity]) {
    return CITY_GEO_DATA[cleanCity];
  }

  const cleanState = stateSlug.toLowerCase();
  const stateGeo = STATE_GEO_DATA[cleanState] || { lat: 37.0902, lng: -95.7129, zoom: 6 };

  // Format readable state name
  const formattedState = cleanState
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    name: cleanCity ? cleanCity.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : formattedState,
    state: formattedState,
    stateSlug: cleanState,
    citySlug: cleanCity || undefined,
    lat: stateGeo.lat,
    lng: stateGeo.lng,
    zoom: stateGeo.zoom,
    serviceRadiusMeters: 45000,
  };
}
