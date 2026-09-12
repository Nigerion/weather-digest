import {getCoordinates, getWeather} from "../api/api.js"

export async function getService(city, days) {
    const coodinates = await getCoordinates(city)
    let latitude = coodinates.latitude
    let longitude = coodinates.longitude
    const weather = await getWeather (latitude, longitude, days)

    return {
        ...coodinates,
        weather
    }
}