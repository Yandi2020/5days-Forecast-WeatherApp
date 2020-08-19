//forecast.getCity('Berlin'); //cityInfo.EnglishName .Key
//forecast.getForecast('178087');//fivedays[0].Date .Day.Icon .Night.Icon .Temperature.Maximum.Value .Temperature.Minimum.Value
//forecast.getWeather('178087');//weather.IsDayTime .Temperature.Metric.Value .WeatherIcon .LocalObservationDateTime .WeatherText

const form = document.querySelector('form');
const forecast = new Forecast();
const current = document.querySelector('.current');
const details = document.querySelector('.details');
const future = document.querySelector('#sec3');
const card = document.querySelector('.card');

const updateUI = (data) => {
    const cityInfo = data.cityInfo;
    const weather = data.weather;
    const fivedays = data.fivedays;

    //01. current weather and details
    if(weather.IsDayTime){
        current.querySelector('img').setAttribute('src','img/day.svg');
    }else{
        current.querySelector('img').setAttribute('src','img/night.svg');
    }

    let now = new Date(weather.LocalObservationDateTime);
    let datum = now.toDateString();

    html = `
        <h5 class="my-3">${cityInfo.EnglishName}</h5>
        <div class="my-3">${datum}</div>
        <div class="icon bg-light mx-auto text-center">
            <img src="img/icons/${weather.WeatherIcon}.svg"><br>
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
            <div>${weather.WeatherText}</div>
        </div>
    `;
    details.innerHTML = html;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    //02. five days forecast
    fivedays.forEach((day) => {
       let datum = new Date(day.Date);
       let Datum = datum.toDateString();

        html = `
        <div>
            <div class="datum text-center display-4 my-4 text-muted text-uppercase">
                ${Datum}
            </div>
            <div class="icon bg-light text-center">
                <img src="img/icons/${day.Day.Icon}.svg"><br>
                <span>${day.Temperature.Maximum.Value}</span>
                <span>&deg;C</span><br>
            </div><br>
            <div class="icon bg-light text-center">
                <img src="img/icons/${day.Night.Icon}.svg"><br>
                <span>${day.Temperature.Minimum.Value}</span>
                <span>&deg;C</span><br>
            </div>
        </div>
        `;
       
        future.innerHTML += html;
    })
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const city = form.city.value.trim();
    form.reset();
    future.innerHTML = '';

    forecast.updateCity(city)
     .then(data => updateUI(data)) //important to define updateUI function outside 
     .catch(err => console.log(err));
})
