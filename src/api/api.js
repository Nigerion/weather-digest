export async function getCoordinates(city) {
    const url = process.env.GEOCODING_API_URL;

    if (!url) {
        throw new Error('Переменная GEOCODING_API_URL не задана');
    }

    const params = new URLSearchParams({
        name: city,
        count: '1',
        language: 'ru',
        format: 'json',
    });

    const timeout = Number(process.env.TIME_OUT ?? 5000);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    let response;

    try {
        response = await fetch(`${url}?${params}`, { signal: controller.signal });
    } catch (err) {
        if (err.name === 'AbortError') {
            throw new Error(`Превышен таймаут ${timeout} мс`);
        }
        throw new Error(`Ошибка сети: ${err.message}`);
    } finally {
        clearTimeout(timer);
    }

    if (response.status >= 400 && response.status < 500) {
        throw new Error(`Ошибка ${response.status}. Проблема на стороне клиента. Проверьте параметры запроса.`);
    }

    if (response.status >= 500) {
        throw new Error(`Ошибка ${response.status}. Проблема на стороне сервера. Попробуйте позже.`);
    }

    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}. Неизвестный статус.`);
    }

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error('Не удалось разобрать JSON в ответе API');
    }

    if (!data.results?.length) {
        throw new Error(`Город не найден: ${city}`);
    }

    const { latitude, longitude, name, country } = data.results[0];

    return { latitude, longitude, name, country };
}



export const getWeather = async (latitude, longitude, days) =>{
    const url= process.env.OPEN_METEO_API_URL;

    if (!url) {
        throw new Error('Переменная OPEN_METEO_API_URL не задана');
    }

    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
        forecast_days: String(days),
        timezone: 'auto',
    });

    const timeout = Number(process.env.TIME_OUT ?? 5000);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    let response;

    try {
        response = await fetch(`${url}?${params}`, { signal: controller.signal });
    } catch (err) {
        if (err.name === 'AbortError') {
            throw new Error(`Превышен таймаут ${timeout} мс`);
        }
        throw new Error(`Ошибка сети: ${err.message}`);
    } finally {
        clearTimeout(timer);
    }

    if (response.status >= 400 && response.status < 500) {
        throw new Error(`Ошибка ${response.status}. Проблема на стороне клиента. Проверьте параметры запроса.`);
    }

    if (response.status >= 500) {
        throw new Error(`Ошибка ${response.status}. Проблема на стороне сервера. Попробуйте позже.`);
    }

    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}. Неизвестный статус.`);
    }

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error('Не удалось разобрать JSON в ответе API');
    }

    const { time, temperature_2m_max, temperature_2m_min, precipitation_sum } = data.daily ?? {};

    if (!time?.length) {
        throw new Error('В ответе API нет данных о прогнозе');
    }

    return time.map((date, i) => ({
        date,
        temperature_2m_min: temperature_2m_min[i],
        temperature_2m_max: temperature_2m_max[i],
        precipitation_sum: precipitation_sum[i],
    }));

}
