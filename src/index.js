import 'dotenv/config';
import {parser} from './cli/parser.js'
import {getService} from './services/service.js'

try {
    const arg = process.argv.splice(2);
    const a = await parser(arg)
    const {citysVal, daysVal, noCache} = a;
    const as = await getService(citysVal, daysVal);
   
    console.log(as)
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}