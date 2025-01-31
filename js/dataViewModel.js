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

  const obt = data.origin.metar_time.substring(14, 19);
  const std = data.params.time_generated.substring(14, 19);
  const sta = data.destination.metar_time.substring(14, 19);
  const ibt = data.destination.metar_time.substring(14, 19);

  return {
    currentFlight,
    airplane,
    callsign,
    route,
    obt,
    std,
    sta,
    ibt,
  };
};
