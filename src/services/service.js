import {getCoordinates, getWeather} from "../api/api.js"

export async function getService(city, days) {
    const coordinates = await getCoordinates(city);
    const weather = await getWeather(coordinates.latitude, coordinates.longitude, days);

    return {
        ...coordinates,
        weather,
    };
}