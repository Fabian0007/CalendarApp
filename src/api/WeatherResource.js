import { keyWeather } from './keys';

export default {
  get: request => fetch(`http://api.openweathermap.org/data/2.5/weather?q=${request.city}&appid=${keyWeather}`)
    .then((response) => {
      if (response.status > 202) {
        throw new Error(response.headers.get('internalerrormessage') || response.status);
      }
      return (request.responsetext ? response.text() : response.json());
    }),
};
