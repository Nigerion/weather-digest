import {parser} from './cli/parser.js'

try {
    const arg = process.argv.splice(2);
    const a = parser(arg)
    console.log(a)
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}