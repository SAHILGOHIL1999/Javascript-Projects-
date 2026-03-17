// 1. DOG API
async function getDog() {
    const dogImg = document.getElementById("dogImage");
    try {
        dogImg.style.opacity = "0.5";
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        dogImg.src = data.message;
        dogImg.style.opacity = "1";
    } catch (err) {
        console.error("Dog API Error:", err);
    }
}

// 2. COVID-19 API
async function getCoronaData() {
    const country = document.getElementById("country").value.trim();
    if (!country) return alert("Please enter a country!");

    try {
        const res = await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}`);
        const data = await res.json();

        if (data.message) {
            alert("Country not found!");
        } else {
            document.getElementById("cases").innerText = `Total Cases: ${data.cases.toLocaleString()}`;
            document.getElementById("deaths").innerText = `Total Deaths: ${data.deaths.toLocaleString()}`;
            document.getElementById("recovered").innerText = `Recovered: ${data.recovered.toLocaleString()}`;
        }
    } catch (err) {
        alert("COVID API is currently unreachable.");
    }
}

// 3. MOVIE API (OMDb)
async function getMovieData() {
    const movie = document.getElementById("movieName").value.trim();
    const resultDiv = document.getElementById("movieResult");
    if (!movie) return alert("Enter a movie name!");

    const apiKey = "7c0b9be"; 
    // FIXED: Using https instead of http
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movie)}`;

    try {
        resultDiv.innerHTML = "Searching...";
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") {
            resultDiv.innerHTML = `
                <div style="margin-top:10px; border-left: 4px solid #3498db; padding-left: 10px;">
                    <p><strong>${data.Title}</strong> (${data.Year})</p>
                    <p>Rating: ⭐ ${data.imdbRating}</p>
                    <img src="${data.Poster}" width="100" style="margin-top:5px;">
                </div>`;
        } else {
            resultDiv.innerHTML = `<p style="color:red;">${data.Error}</p>`;
        }
    } catch (err) {
        resultDiv.innerHTML = "Movie API Error.";
    }
}

// 4. WEATHER API (Open-Meteo)
async function getWeatherData() {
    const city = document.getElementById("cityName").value.trim();
    const resultDiv = document.getElementById("weatherResult");
    if (!city) return alert("Enter a city name!");

    try {
        resultDiv.innerHTML = "Locating...";
        // FIXED: Added the city variable back into the URL
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();

        if (!geoData.results) {
            resultDiv.innerHTML = "City not found!";
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
        const weatherData = await weatherRes.json();

        resultDiv.innerHTML = `
            <div style="margin-top:10px; color: #2c3e50;">
                <p><strong>${name}</strong></p>
                <p style="font-size: 1.5rem;">${weatherData.current.temperature_2m}°C</p>
            </div>`;
    } catch (err) {
        resultDiv.innerHTML = "Weather API Error.";
    }
}