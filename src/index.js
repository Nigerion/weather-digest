import 'dotenv/config';
import {parser} from './cli/parser.js'
import {formatterData} from './format/formatter.js'
import {setteld }from "./utils/setteld.js"


try {
    const arg = process.argv.slice(2);
    const { citysVal, daysVal, noCache } = parser(arg);

    const results = await Promise.allSettled(
        citysVal.map((city) => setteld(city, daysVal, noCache))
    );

    let hasError = false;

    results.forEach((item, i) => {
        const city = citysVal[i];
        if (item.status === 'fulfilled') {
            formatterData(item.value);
        } else {
            hasError = true;
            console.error(`Город ${city}: ${item.reason.message}`);
        }
    });

    process.exitCode = hasError ? 1 : 0;

} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}