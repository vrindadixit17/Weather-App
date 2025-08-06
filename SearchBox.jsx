import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react'

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);


    const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
    const API_KEY = "8fb8cf3112fd96ea581a3ad0ab83ee4f";

    let getWeatherInfo = async (city) => {
        try {
            let response = await fetch(
                `${API_URL}q=${city}&appid=${API_KEY}&units=metric`
            );
            let jsonResponse = await response.json();

            const result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp.min,
                tempMax: jsonResponse.main.temp.max,
                humidity: jsonResponse.main.humidity,
                feels_like: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            }
            console.log(result);
            updateInfo(result);
            return result;
        }
        catch (err) {
            throw err;
        }
    }


    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo(city);
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
        }
    }
    return (
        <div className='SearchBox'>
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="city name"
                    variant="outlined"
                    required value={city}
                    onChange={handleChange} />
                <br /> <br />
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#6a5acd' }}>
                    Search
                </Button>

                {error && <p style={{ color: "red" }}>No such place exists</p>}
            </form>

        </div>
    )
}