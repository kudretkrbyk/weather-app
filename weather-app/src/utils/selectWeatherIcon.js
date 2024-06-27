import sunSvg from "../assets/sun.svg";
import cloudSvg from "../assets/cloud.svg";
import halfCloudSvg from "../assets/halfCloud.svg";
import rainSvg from "../assets/rainy.svg";

const selectWeatherIcon = (weatherDescription) => {
  switch (weatherDescription.toLowerCase()) {
    case "clear":
      return sunSvg;
    case "clouds":
      return cloudSvg;
    case "rain":
      return rainSvg;

    case "few clouds":
      return halfCloudSvg;
    case "scattered clouds":
      return halfCloudSvg;
    case "broken clouds":
      return cloudSvg;
    case "overcast clouds":
      return cloudSvg;
    default:
      return sunSvg; // Varsayılan bir ikon
  }
};

export default selectWeatherIcon;
