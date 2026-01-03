import React, { memo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import DataCurrentTime from './DataCurrentTime';
import TableShowData from './TableShowData';
import GoldParticles from './GoldParticles';
import WeatherWidget from './WeatherWidget';

function HomeComponent() {
    const navigate = useNavigate();
    const wakeLockRef = useRef(null);
    const [isSunlightMode, setIsSunlightMode] = React.useState(false);

    // Callback to receive weather code from widget
    // Codes 0, 1, 2, 3 represent Sunny/Clear/Partly Cloudy
    const handleWeatherUpdate = React.useCallback((code) => {
        const hour = new Date().getHours();
        // Enable Sunlight Mode if it's daytime (7AM-5PM) AND weather is "Sunny"
        const isDaytime = hour >= 7 && hour <= 17;
        const isSunny = [0, 1, 2, 3].includes(code);

        // Manual override for testing: console.log to debug
        console.log(`Weather Code: ${code} | Hour: ${hour} | Sunlight Mode: ${isDaytime && isSunny}`);

        setIsSunlightMode(isDaytime && isSunny);
    }, []);

    // Redirect mobile users to Admin page
    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);

    // Wake Lock API: Prevents screen from sleeping
    useEffect(() => {
        const requestWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    wakeLockRef.current = await navigator.wakeLock.request('screen');
                    console.log('✅ Wake Lock is active - screen will stay on');

                    wakeLockRef.current.addEventListener('release', () => {
                        console.log('⚠️ Wake Lock was released');
                    });
                }
            } catch (err) {
                console.log(`Wake Lock error: ${err.name}, ${err.message}`);
            }
        };

        requestWakeLock();

        // Re-acquire wake lock when page becomes visible again
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                requestWakeLock();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (wakeLockRef.current) {
                wakeLockRef.current.release();
            }
        };
    }, []);

    return (
        <div className={`d-flex flex-column position-relative ${isSunlightMode ? 'sunlight-mode' : ''}`} style={{ height: '100vh', padding: '1vh 2vw', overflow: 'hidden' }}>
            {/* Disable particles in Sunlight Mode for maximum clarity */}
            {!isSunlightMode && <GoldParticles />}

            {/* TV Header: More Compact, Horizontal */}
            <header className='container-fluid header mb-0 d-flex justify-content-between align-items-center position-relative' style={{ zIndex: 1 }}>
                <div className='d-flex flex-column justify-content-center text-center'>
                    <h2 className='dntn m-0' style={{ fontSize: '2.5vh', lineHeight: '1.2', paddingBottom: '0' }}>DNTN TIỆM VÀNG</h2>
                    <p style={{ fontSize: '13vh', fontWeight: '800', lineHeight: 1.1, margin: 0, letterSpacing: '3px', paddingBottom: '0.5vh', paddingTop: '1vh', display: 'block' }} className="animate-charcter">PHƯƠNG THẢO</p>
                </div>

                <div className='d-flex align-items-center gap-4'>
                    <WeatherWidget onWeatherUpdate={handleWeatherUpdate} />
                    <div className='text-end'>
                        <DataCurrentTime />
                    </div>


                </div>
            </header>

            <div className='flex-grow-1' style={{ overflow: 'hidden', zIndex: 1 }}>
                <TableShowData />
            </div>
        </div>
    )
}

export default memo(HomeComponent);
