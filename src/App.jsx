import { useState, useEffect, useRef } from "react";
import axios from "axios";

const WeatherAR = () => {
  const arSceneRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=f25672072039fabbb7f951d59c464e64&units=metric"
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (arSceneRef.current && weatherData) {
      const { name, main, weather } = weatherData;
      const arScene = arSceneRef.current;

      const weatherInfo = `
        <a-entity position="0 0 -3">
          <a-box width="2" height="1" depth="0.1" color="white"></a-box>
          <a-text value="Ciudad: ${name}\nTemperatura: ${main.temp}°C\nCondiciones: ${weather[0].description}" align="center" position="0 0 0.05" color="black"></a-text>
        </a-entity>
      `;

      arScene.innerHTML = weatherInfo;
    }
  }, [arSceneRef, weatherData]);

  return (
    <div>
      <a-scene embedded arjs="sourceType: webcam;">
        <a-entity ref={arSceneRef}></a-entity>
      </a-scene>
    </div>
  );
};

export default WeatherAR;