import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        temp: 25.55,
        tempMin: 23,
        tempMax: 26,
        humidity: 47,
        feels_like: 24.84,
        weather: "haze"
    })

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Weather App</h1>

            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />

        </div>
    )
}