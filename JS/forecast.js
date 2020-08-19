class Forecast{
    constructor(){
        this.key = 'u38lJIAdta8SVIIghYz3GRR5YN61C5vs';
        //this.key = 'LWlgrLUfcsf3ekSYBK449E8RV8pwmsyl'; 2nd key
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.fivedaysURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURL + query);
        const data = await response.json();

        console.log(data[0]);
        return data[0];
    }

    async getForecast(id){
        const query = `${id}?apikey=${this.key}&metric=true`;
        const response = await fetch(this.fivedaysURL + query);
        const data = await response.json();

        console.log(data.DailyForecasts);
        return data.DailyForecasts;
    }

    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();

        console.log(data[0]);
        return data[0];
    }

    //this is important step to get all three info in one call 
    async updateCity(city){
        const cityInfo = await this.getCity(city);
        const weather = await this.getWeather(cityInfo.Key);
        const fivedays = await this.getForecast(cityInfo.Key);

        return{cityInfo, weather, fivedays}
    }
}