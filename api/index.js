import axios from 'axios';

export async function getWeather(latitude, longitude, apiKey) {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`,
  );
  return response.data;
}

export const openweathermap = async (latitude, longitude, apiKey) => {
  try {
    const data = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`,
    );
    return [data, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};
