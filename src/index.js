import 'dotenv/config';
import {parser} from './cli/parser.js'
import {getWeather, getCoordinates} from './api/api.js'

try {
    const arg = process.argv.splice(2);
    const a = parser(arg)
    const {citysVal, daysVal, noCache} = a;
    const as = await getCoordinates(citysVal[0]);
    const sa = await getWeather(as.latitude, as.longitude, 3);
    console.log(sa)
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}