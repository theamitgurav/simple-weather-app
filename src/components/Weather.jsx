import React, { useEffect, useRef, useState } from "react";
import "./Weather.css"
import search from "../assets/search.png"
import clear from "../assets/clear.png"
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import humidity from "../assets/humidity.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import wind from "../assets/wind.png"



function Weather(){

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false)

    const searchh = async(location)=>{
        if(location===""){
            alert("Enter City Name")
            return;
        }
        try {
            // const apiKey = '6192c50168f0433891c53118252401';
            const apiurl =`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${(location)}&aqi=yes`
            const response = await fetch(apiurl);
            const data = await response.json();
            if(!response.ok){
                alert(data.message)
            }
            console.log(data)
            setWeatherData({
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                temperature: Math.floor(data.current.temp_c),
                location : data.location.name,
                icon : data.current.condition.icon
            })
        } catch (error) {
            setWeatherData(false)
            console.log(error)
        }

    }

    useEffect(()=>{
        searchh("mumbai")
    },[])
    return(
        <div className="weather" >
            <div className="search-bar">
                <input ref={inputRef}
                type="text" placeholder="Search.." />
                <img onClick={()=>{searchh(inputRef.current.value); inputRef.current.value = '';}}
                src={search} alt=""></img>
            </div>
            {weatherData?<>

                <img src={weatherData.icon} className="weather-icon" />
            <p className="temp">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humidity}</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>:<>
            <p className="mt-5 text-xl text-red-600">API Request Failed</p>
            </>}
           
        </div>
    )
}

export default Weather