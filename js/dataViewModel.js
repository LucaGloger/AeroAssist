export const fetchFlightInfo = async () => {
  const userName = "Captainlew08";
  const url = `https://www.simbrief.com/api/xml.fetcher.php?username=${userName}&json=v2`;

  const response = await fetch(url);
  const data = await response.json();

  const currentFlight =
    data.origin.icao_code + `-` + data.destination.icao_code;
  const airplane = data.aircraft.name;
  const callsign = data.atc.callsign;
  const route = data.general.route;

  const obt = data.origin.metar_time.substring(14, 20);
  const std = data.params.time_generated.substring(14, 20);
  const sta = data.destination.metar_time.substring(14, 20);
  const ibt = data.destination.metar_time.substring(14, 20);

  const pax = data.general.passengers;
  const cargo = data.weights.cargo;
  const payload = data.weights.payload;
  const zfw = data.weights.est_zfw;
  const fuel = data.fuel.plan_ramp;
  const tow = data.weights.est_tow;
  const law = data.tlr.landing.conditions.planned_weight;

  return {
    currentFlight,
    airplane,
    callsign,
    route,
    obt,
    std,
    sta,
    ibt,
    pax,
    cargo,
    payload,
    zfw,
    fuel,
    tow,
    law,
    origin: data.origin.icao_code,
    destination: data.destination.icao_code,
  };
};

export const fetchWeatherData = async (airport) => {
  try {
    const url = `https://aviationweather.gov/api/data/metar?ids=${airport}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
  
    return data[0];
  } catch (error) {
    console.log("Error getting Weather Data");
  }
};
