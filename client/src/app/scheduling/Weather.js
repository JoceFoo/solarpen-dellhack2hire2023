import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { CiBatteryCharging, CiBatteryEmpty, CiCloudSun, CiSun } from 'react-icons/ci';

const Weather = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [diff, setDiff] = useState(null);

  const openweather_apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;

  const getWeatherInfo = async () => {
    try {
      const locationResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openweather_apiKey}`
      );

      if (locationResponse.data.length > 0) {
        const { lat, lon } = locationResponse.data[0];

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openweather_apiKey}`
        );

        setWeatherData(weatherResponse.data);

        // Prepare the data to send to the Flask backend
        const postData = {
          temperature: weatherResponse.data.main.temp,
          apparentTemperature: weatherResponse.data.main.feels_like,
          pressure: weatherResponse.data.main.pressure,
          windSpeed: weatherResponse.data.wind.speed,
          windBearing: weatherResponse.data.wind.deg,
          visibility: weatherResponse.data.visibility,
          cloudCover: weatherResponse.data.clouds.all
        };

        // Send the data to the Flask backend
        const response = await axios.post('http://localhost:5000/predict_weather', postData);
        
        console.log('Response from backend:', response.data);

        // Update state variables with the received data
        const { prediction, recommendation, diff } = response.data;
        setPrediction(prediction);
        setRecommendation(recommendation);
        setDiff(diff);

      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error sending weather data:', error);
    }
  };

  return (
    <Flex direction='column' align='start'>
      <Text alignSelf='center' fontSize='2xl'>Weather App</Text>
      <Flex my='2rem'>
        <Input
          w='400'
          mr='1rem'
          type="text"
          value={city}
          borderColor='gray.600'
          _hover={{ borderColor: 'gray.700' }}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          />

        <Button bg='gray.200' _hover={{ bg: 'gray.300' }}
          onClick={getWeatherInfo}>Get Weather</Button>
      </Flex>
      {weatherData && (
        <Box>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Apparent Temperature: {weatherData.main.feels_like}°C</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>WindSpeed: {weatherData.wind.speed} m/s</p>
          <p>WindBearing: {weatherData.wind.deg}°</p>
          <p>Visibility: {weatherData.visibility} m</p>
          <p>CloudCover: {weatherData.clouds.all} %</p>

          <Box mt='4rem'>
            {prediction && <Text>Prediction: {prediction.toFixed(6)} kW</Text>}
            {recommendation && 
              (<Flex align='center' gap='2'>
                {(recommendation.search('low') >= 0) ? <CiBatteryEmpty size='50' /> : <CiBatteryCharging size='50' />}
                Recommendation: {recommendation}
              </Flex>)
            }
            {diff && 
              (<Flex align='center' gap='2'>
                {(diff.search('lower') >= 0) ? <CiCloudSun size='50' /> : <CiSun size='50' />}
                {diff}
              </Flex>)
            }
          </Box>

        </Box>
      )}
    </Flex>
  );
};

export default Weather;
