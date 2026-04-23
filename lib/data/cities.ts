export type City = {
  name: string;
  slug: string; // URL slug: /taxi-in-[slug]
  state: string;
  stateSlug: string; // links to /locations/[stateSlug]
  airport?: string; // IATA code if major airport city
};

export const USA_CITIES: City[] = [
  // Northeast
  { name: "New York", slug: "new-york", state: "New York", stateSlug: "new-york", airport: "JFK" },
  { name: "Brooklyn", slug: "brooklyn", state: "New York", stateSlug: "new-york" },
  { name: "Queens", slug: "queens", state: "New York", stateSlug: "new-york", airport: "LGA" },
  { name: "Manhattan", slug: "manhattan", state: "New York", stateSlug: "new-york" },
  { name: "Bronx", slug: "bronx", state: "New York", stateSlug: "new-york" },
  { name: "Buffalo", slug: "buffalo", state: "New York", stateSlug: "new-york", airport: "BUF" },
  { name: "Boston", slug: "boston", state: "Massachusetts", stateSlug: "massachusetts", airport: "BOS" },
  { name: "Philadelphia", slug: "philadelphia", state: "Pennsylvania", stateSlug: "pennsylvania", airport: "PHL" },
  { name: "Pittsburgh", slug: "pittsburgh", state: "Pennsylvania", stateSlug: "pennsylvania", airport: "PIT" },
  { name: "Newark", slug: "newark", state: "New Jersey", stateSlug: "new-jersey", airport: "EWR" },
  { name: "Baltimore", slug: "baltimore", state: "Maryland", stateSlug: "maryland", airport: "BWI" },
  { name: "Washington DC", slug: "washington-dc", state: "Washington DC", stateSlug: "virginia", airport: "DCA" },
  { name: "Hartford", slug: "hartford", state: "Connecticut", stateSlug: "connecticut" },
  { name: "Providence", slug: "providence", state: "Rhode Island", stateSlug: "rhode-island" },
  { name: "Albany", slug: "albany", state: "New York", stateSlug: "new-york" },

  // Southeast
  { name: "Miami", slug: "miami", state: "Florida", stateSlug: "florida", airport: "MIA" },
  { name: "Orlando", slug: "orlando", state: "Florida", stateSlug: "florida", airport: "MCO" },
  { name: "Tampa", slug: "tampa", state: "Florida", stateSlug: "florida", airport: "TPA" },
  { name: "Jacksonville", slug: "jacksonville", state: "Florida", stateSlug: "florida", airport: "JAX" },
  { name: "Fort Lauderdale", slug: "fort-lauderdale", state: "Florida", stateSlug: "florida", airport: "FLL" },
  { name: "West Palm Beach", slug: "west-palm-beach", state: "Florida", stateSlug: "florida", airport: "PBI" },
  { name: "Kissimmee", slug: "kissimmee", state: "Florida", stateSlug: "florida" },
  { name: "Atlanta", slug: "atlanta", state: "Georgia", stateSlug: "georgia", airport: "ATL" },
  { name: "Charlotte", slug: "charlotte", state: "North Carolina", stateSlug: "north-carolina", airport: "CLT" },
  { name: "Raleigh", slug: "raleigh", state: "North Carolina", stateSlug: "north-carolina", airport: "RDU" },
  { name: "Nashville", slug: "nashville", state: "Tennessee", stateSlug: "tennessee", airport: "BNA" },
  { name: "Memphis", slug: "memphis", state: "Tennessee", stateSlug: "tennessee", airport: "MEM" },
  { name: "Louisville", slug: "louisville", state: "Kentucky", stateSlug: "kentucky", airport: "SDF" },
  { name: "Richmond", slug: "richmond", state: "Virginia", stateSlug: "virginia", airport: "RIC" },
  { name: "Virginia Beach", slug: "virginia-beach", state: "Virginia", stateSlug: "virginia" },
  { name: "New Orleans", slug: "new-orleans", state: "Louisiana", stateSlug: "louisiana", airport: "MSY" },
  { name: "Birmingham", slug: "birmingham", state: "Alabama", stateSlug: "alabama", airport: "BHM" },
  { name: "Columbia", slug: "columbia", state: "South Carolina", stateSlug: "south-carolina" },
  { name: "Savannah", slug: "savannah", state: "Georgia", stateSlug: "georgia", airport: "SAV" },

  // Midwest
  { name: "Chicago", slug: "chicago", state: "Illinois", stateSlug: "illinois", airport: "ORD" },
  { name: "Detroit", slug: "detroit", state: "Michigan", stateSlug: "michigan", airport: "DTW" },
  { name: "Columbus", slug: "columbus", state: "Ohio", stateSlug: "ohio", airport: "CMH" },
  { name: "Cleveland", slug: "cleveland", state: "Ohio", stateSlug: "ohio", airport: "CLE" },
  { name: "Cincinnati", slug: "cincinnati", state: "Ohio", stateSlug: "ohio", airport: "CVG" },
  { name: "Indianapolis", slug: "indianapolis", state: "Indiana", stateSlug: "indiana", airport: "IND" },
  { name: "Minneapolis", slug: "minneapolis", state: "Minnesota", stateSlug: "minnesota", airport: "MSP" },
  { name: "Kansas City", slug: "kansas-city", state: "Missouri", stateSlug: "missouri", airport: "MCI" },
  { name: "St Louis", slug: "st-louis", state: "Missouri", stateSlug: "missouri", airport: "STL" },
  { name: "Milwaukee", slug: "milwaukee", state: "Wisconsin", stateSlug: "wisconsin", airport: "MKE" },
  { name: "Madison", slug: "madison", state: "Wisconsin", stateSlug: "wisconsin" },
  { name: "Omaha", slug: "omaha", state: "Nebraska", stateSlug: "nebraska", airport: "OMA" },
  { name: "Des Moines", slug: "des-moines", state: "Iowa", stateSlug: "iowa", airport: "DSM" },
  { name: "Grand Rapids", slug: "grand-rapids", state: "Michigan", stateSlug: "michigan", airport: "GRR" },

  // South / Southwest
  { name: "Houston", slug: "houston", state: "Texas", stateSlug: "texas", airport: "IAH" },
  { name: "Dallas", slug: "dallas", state: "Texas", stateSlug: "texas", airport: "DFW" },
  { name: "San Antonio", slug: "san-antonio", state: "Texas", stateSlug: "texas", airport: "SAT" },
  { name: "Austin", slug: "austin", state: "Texas", stateSlug: "texas", airport: "AUS" },
  { name: "Fort Worth", slug: "fort-worth", state: "Texas", stateSlug: "texas" },
  { name: "El Paso", slug: "el-paso", state: "Texas", stateSlug: "texas", airport: "ELP" },
  { name: "Phoenix", slug: "phoenix", state: "Arizona", stateSlug: "arizona", airport: "PHX" },
  { name: "Tucson", slug: "tucson", state: "Arizona", stateSlug: "arizona", airport: "TUS" },
  { name: "Scottsdale", slug: "scottsdale", state: "Arizona", stateSlug: "arizona" },
  { name: "Las Vegas", slug: "las-vegas", state: "Nevada", stateSlug: "nevada", airport: "LAS" },
  { name: "Reno", slug: "reno", state: "Nevada", stateSlug: "nevada", airport: "RNO" },
  { name: "Albuquerque", slug: "albuquerque", state: "New Mexico", stateSlug: "new-mexico", airport: "ABQ" },
  { name: "Oklahoma City", slug: "oklahoma-city", state: "Oklahoma", stateSlug: "oklahoma", airport: "OKC" },
  { name: "Tulsa", slug: "tulsa", state: "Oklahoma", stateSlug: "oklahoma", airport: "TUL" },
  { name: "Little Rock", slug: "little-rock", state: "Arkansas", stateSlug: "arkansas", airport: "LIT" },

  // West
  { name: "Los Angeles", slug: "los-angeles", state: "California", stateSlug: "california", airport: "LAX" },
  { name: "San Francisco", slug: "san-francisco", state: "California", stateSlug: "california", airport: "SFO" },
  { name: "San Diego", slug: "san-diego", state: "California", stateSlug: "california", airport: "SAN" },
  { name: "San Jose", slug: "san-jose", state: "California", stateSlug: "california", airport: "SJC" },
  { name: "Sacramento", slug: "sacramento", state: "California", stateSlug: "california", airport: "SMF" },
  { name: "Oakland", slug: "oakland", state: "California", stateSlug: "california", airport: "OAK" },
  { name: "Fresno", slug: "fresno", state: "California", stateSlug: "california", airport: "FAT" },
  { name: "Long Beach", slug: "long-beach", state: "California", stateSlug: "california" },
  { name: "Anaheim", slug: "anaheim", state: "California", stateSlug: "california" },
  { name: "Seattle", slug: "seattle", state: "Washington", stateSlug: "washington", airport: "SEA" },
  { name: "Spokane", slug: "spokane", state: "Washington", stateSlug: "washington", airport: "GEG" },
  { name: "Portland", slug: "portland", state: "Oregon", stateSlug: "oregon", airport: "PDX" },
  { name: "Denver", slug: "denver", state: "Colorado", stateSlug: "colorado", airport: "DEN" },
  { name: "Colorado Springs", slug: "colorado-springs", state: "Colorado", stateSlug: "colorado" },
  { name: "Salt Lake City", slug: "salt-lake-city", state: "Utah", stateSlug: "utah", airport: "SLC" },
  { name: "Boise", slug: "boise", state: "Idaho", stateSlug: "idaho", airport: "BOI" },
  { name: "Honolulu", slug: "honolulu", state: "Hawaii", stateSlug: "hawaii", airport: "HNL" },
  { name: "Anchorage", slug: "anchorage", state: "Alaska", stateSlug: "alaska", airport: "ANC" },

  // More Texas cities
  { name: "Plano", slug: "plano", state: "Texas", stateSlug: "texas" },
  { name: "Arlington", slug: "arlington", state: "Texas", stateSlug: "texas" },
  { name: "Corpus Christi", slug: "corpus-christi", state: "Texas", stateSlug: "texas" },
  { name: "Lubbock", slug: "lubbock", state: "Texas", stateSlug: "texas", airport: "LBB" },

  // More Florida cities
  { name: "St Petersburg", slug: "st-petersburg", state: "Florida", stateSlug: "florida" },
  { name: "Clearwater", slug: "clearwater", state: "Florida", stateSlug: "florida" },
  { name: "Daytona Beach", slug: "daytona-beach", state: "Florida", stateSlug: "florida", airport: "DAB" },
  { name: "Boca Raton", slug: "boca-raton", state: "Florida", stateSlug: "florida" },
  { name: "Tallahassee", slug: "tallahassee", state: "Florida", stateSlug: "florida", airport: "TLH" },

  // More NY / NJ
  { name: "Jersey City", slug: "jersey-city", state: "New Jersey", stateSlug: "new-jersey" },
  { name: "Yonkers", slug: "yonkers", state: "New York", stateSlug: "new-york" },
  { name: "Syracuse", slug: "syracuse", state: "New York", stateSlug: "new-york", airport: "SYR" },
];
