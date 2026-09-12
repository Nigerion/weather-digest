import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {parsePath} from '../utils/parsePath.js'

export async function storage(method, city, data) {
  const cityValue = city.toLowerCase();

  const catalog = process.env.CATALOG || 'reports';

  const filePath = parsePath(catalog, cityValue);

  if (method === 'get') {
    try {
      const rawData = await readFile(filePath, 'utf8'); 
      return JSON.parse(rawData);
    } catch {
      return null;
    }
  }

  if (method === 'save') {
    await mkdir(catalog, { recursive: true });
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}