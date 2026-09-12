export function formatterData(data){
    console.log(`Страна: ${data.country} Город: ${data.name}`)
    console.log(`Координаты: ${data.latitude}, ${data.longitude}`)
    for (const i of data.weather){
        console.log(`Дата: ${i.date}, Мин. температура: ${i.temperature_2m_min}°C, Макс. температура: ${i.temperature_2m_max}°C, Осадки: ${i.precipitation_sum} в мм`)
    }
}