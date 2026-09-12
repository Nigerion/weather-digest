export const parser = (item) =>{
    const indexCity= item.indexOf('--city')
    const indexDays= item.indexOf('--days');
    const indexNoCache= item.indexOf('--no-cache');

    if(indexCity === -1){
        throw new Error("Флаг --city обязателен")
    }

    const citys= item[indexCity+1];

    if(citys===undefined || citys.startsWith('--') ) {
       throw new Error('После флага --city необходимо укаазать город. Например: Саратов')
    }

    const citysVal= citys?.split(',').map(i => i.trim()).filter(Boolean);

    if(citysVal?.lenght < 1){
        throw new Error('После флага --city необходимо укаазать город, а не пустую строку. Например: Саратов')
    }

    const days=indexDays!==-1? item[indexDays+1]: '3' 

    if(days===undefined || days.startsWith('--')){
        throw new Error("После флага --days необходимо указать количество дней")
    }
    
    const daysVal = Number(days)

    if(daysVal > 7 || daysVal <= 0){
        throw new Error('Количество дней должно быть от 1 до 7')
    }

    const noCache= item[indexNoCache] ? true : false;

    return {citysVal, daysVal, noCache}
}
