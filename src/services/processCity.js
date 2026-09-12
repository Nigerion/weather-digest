import {storage }from "../storage/storage.js"
import {getService} from '../services/service.js'

export async function processCity(city, days, nocache,){
    if(!nocache){
        const cache = await storage('get', city)
        if(cache){
            console.log(`Данные для города ${city} взяты из кэша`)
            return cache; 
        }
    }
    const data= await getService(city,days)
    await storage('save', data.name, data)
    return data;
}