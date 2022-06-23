const form = document.querySelector('form');

const forecast = document.querySelector('.app-body');

const weatherDisplay = document.querySelector('.d-none');

// to display the weather information on the app
const updateUi = (data) => {

    const cityDets = data.cityDets;

    const weather = data.weather;

    forecast.innerHTML = `
      <h2>${cityDets.EnglishName}</h2>
        <p>${weather.WeatherText}</p>
           <div class="temp">
               <span>${weather.Temperature.Metric.Value}</span>
               <span>&deg;C</span>
            </div>
    `;

    if (weatherDisplay.classList.contains('d-none')) {
        weatherDisplay.classList.remove('d-none');
    };
};


const updateCity = async (city) => {

    const cityDets = await getCity(city);

    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };
};

form.addEventListener('submit', (e) => {
    //prevent default action
    e.preventDefault();

    const city = form.city.value.trim();

    form.reset();

    // updat ui
    updateCity(city).then((data) => {
        updateUi(data);
    }).catch((err) => {
        console.log(err);
    })
});