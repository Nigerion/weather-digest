import * as path from 'path'; 

export const parsePath = (catalog, cityValue) =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return path.join(catalog, `${cityValue}-${year}-${month}-${day}.json`);
}