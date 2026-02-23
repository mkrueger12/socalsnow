export type WeatherStation = {
  name: string;
  tempF: number;
  windMph: number;
  precipIn: number;
  url: string;
  source: string;
};

export type ForecastLink = {
  label: string;
  url: string;
};

export type RangeWeather = {
  stations: WeatherStation[];
  links: ForecastLink[];
};

export const weatherByRange: Record<string, RangeWeather> = {
  "San Gabriel": {
    stations: [
      {
        name: "Mt. Baldy Notch",
        tempF: 28,
        windMph: 25,
        precipIn: 0.7,
        source: "NOAA",
        url: "https://forecast.weather.gov/MapClick.php?lon=-117.64608&lat=34.23674"
      },
      {
        name: "Mt. Wilson",
        tempF: 34,
        windMph: 17,
        precipIn: 0.3,
        source: "MesoWest",
        url: "https://mesowest.utah.edu/cgi-bin/droman/meso_base_dyn.cgi?stn=MTWC1"
      }
    ],
    links: [
      { label: "NOAA San Gabriels Forecast", url: "https://forecast.weather.gov/MapClick.php?zoneid=CAZ554" },
      { label: "Mt. Baldy Cam", url: "https://www.mtbaldyresort.com/mountain-cams/" }
    ]
  },
  "San Bernardino": {
    stations: [
      {
        name: "Big Bear Summit",
        tempF: 31,
        windMph: 15,
        precipIn: 0.5,
        source: "NOAA",
        url: "https://forecast.weather.gov/MapClick.php?lon=-116.88959&lat=34.24389"
      },
      {
        name: "Angelus Oaks",
        tempF: 33,
        windMph: 12,
        precipIn: 0.4,
        source: "MesoWest",
        url: "https://mesowest.utah.edu/cgi-bin/droman/meso_base_dyn.cgi?stn=AGOC1"
      }
    ],
    links: [
      { label: "NOAA Big Bear Forecast", url: "https://forecast.weather.gov/MapClick.php?zoneid=CAZ552" },
      { label: "Big Bear Lake Webcam", url: "https://bigbear.com/webcams/" }
    ]
  },
  "San Jacinto": {
    stations: [
      {
        name: "San Jacinto Peak",
        tempF: 26,
        windMph: 30,
        precipIn: 0.8,
        source: "NOAA",
        url: "https://forecast.weather.gov/MapClick.php?lon=-116.67924&lat=33.8144"
      },
      {
        name: "Idyllwild",
        tempF: 37,
        windMph: 9,
        precipIn: 0.2,
        source: "MesoWest",
        url: "https://mesowest.utah.edu/cgi-bin/droman/meso_base_dyn.cgi?stn=IDYC1"
      }
    ],
    links: [
      { label: "NOAA San Jacinto Forecast", url: "https://forecast.weather.gov/MapClick.php?zoneid=CAZ060" },
      { label: "Palm Springs Tram Weather", url: "https://pstramway.com/weather/" }
    ]
  }
};

export const generalForecast =
  "A cool Pacific pattern remains active with periodic snowfall above 7,000 feet and ridge-top west winds increasing in the afternoons. Plan for rapid visibility changes near storm arrivals.";

export const weatherQuickGlance = Object.entries(weatherByRange).map(([range, rangeWeather]) => ({
  range,
  leadStation: rangeWeather.stations[0]
}));
