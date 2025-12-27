import React, { useState, useEffect } from 'react';

// Free weather API - no API key needed!
// Using Open-Meteo for Long Xuyên, An Giang
const LAT = 10.3473; // Latitude for Long Xuyên
const LON = 105.4645; // Longitude for Long Xuyên

const weatherDescriptions = {
    0: { icon: '☀️', text: 'Trời nắng' },
    1: { icon: '🌤️', text: 'Ít mây' },
    2: { icon: '⛅', text: 'Có mây' },
    3: { icon: '☁️', text: 'Nhiều mây' },
    45: { icon: '🌫️', text: 'Sương mù' },
    48: { icon: '🌫️', text: 'Sương mù đông' },
    51: { icon: '🌧️', text: 'Mưa nhẹ' },
    53: { icon: '🌧️', text: 'Mưa vừa' },
    55: { icon: '🌧️', text: 'Mưa lớn' },
    61: { icon: '🌧️', text: 'Mưa rào nhẹ' },
    63: { icon: '🌧️', text: 'Mưa rào' },
    65: { icon: '🌧️', text: 'Mưa rào lớn' },
    80: { icon: '🌦️', text: 'Mưa rào' },
    81: { icon: '🌦️', text: 'Mưa rào vừa' },
    82: { icon: '🌦️', text: 'Mưa rào lớn' },
    95: { icon: '⛈️', text: 'Giông bão' },
    96: { icon: '⛈️', text: 'Giông có mưa đá' },
    99: { icon: '⛈️', text: 'Giông mạnh' },
};

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=Asia%2FHo_Chi_Minh`
                );
                const data = await response.json();
                if (data.current) {
                    setWeather({
                        temp: Math.round(data.current.temperature_2m),
                        code: data.current.weather_code,
                    });
                }
            } catch (error) {
                // Silent fail - widget just won't show
            }
        };

        fetchWeather();
        // Refresh weather every 5 minutes
        const interval = setInterval(fetchWeather, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (!weather) return null;

    const desc = weatherDescriptions[weather.code] || { icon: '🌡️', text: '' };

    return (
        <div className="glass-pill d-flex align-items-center gap-3">
            <span className="weather-icon animate-charcter">{desc.icon}</span>
            <div className="d-flex flex-column">
                <span className="weather-temp" style={{ lineHeight: '1' }}>{weather.temp}°C</span>
                <span style={{ fontSize: '2.2vh', color: '#ccc', fontWeight: '500' }}>Long Xuyên</span>
            </div>
        </div>
    );
}
