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
        <div className={`d-flex flex-column tv-screen-container position-relative ${isSunlightMode ? 'sunlight-mode' : ''}`} style={{ height: '100vh', padding: '0.8vh 1.8vw', overflow: 'hidden' }}>
            {/* Ambient luxury light leaks */}
            <div className="ambient-glow top-center"></div>

            {/* Disable particles in Sunlight Mode for maximum clarity */}
            {!isSunlightMode && <GoldParticles />}

            {/* VIP Architectural TV Header */}
            <header className='container-fluid vip-header mb-1 d-flex justify-content-between align-items-center position-relative' style={{ zIndex: 2 }}>
                {/* Brand Identity with Royal Insignia */}
                <div className='d-flex align-items-center gap-3'>
                    <div className='brand-emblem-badge'>
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z" fill="url(#crownGrad)" stroke="#FFE082" strokeWidth="0.8" />
                            <path d="M19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V17H19V19Z" fill="url(#crownGrad)" />
                            <circle cx="12" cy="3.5" r="1.4" fill="#FFFDE7" />
                            <circle cx="3" cy="4.5" r="1.2" fill="#FFFDE7" />
                            <circle cx="21" cy="4.5" r="1.2" fill="#FFFDE7" />
                            <defs>
                                <linearGradient id="crownGrad" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FFF9D2" />
                                    <stop offset="0.35" stopColor="#FFD700" />
                                    <stop offset="0.75" stopColor="#F59E0B" />
                                    <stop offset="1" stopColor="#D97706" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className='d-flex flex-column justify-content-center text-start'>
                        <span className='brand-sub-heading'>DNTN TIỆM VÀNG</span>
                        <h1 className='brand-main-title m-0'>PHƯƠNG THẢO</h1>
                        <div className='tccs-badge-pill mt-1'>
                            <span className='tccs-dot-indicator'></span>
                            <span className='tccs-text-code'>TCCS 02:2026/PTAG</span>
                        </div>
                    </div>
                </div>

                {/* Right Status Center: Weather & Live Tabular Clock */}
                <div className='d-flex align-items-center gap-3'>
                    <WeatherWidget onWeatherUpdate={handleWeatherUpdate} />
                    <DataCurrentTime />
                </div>
            </header>

            <div className='flex-grow-1' style={{ overflow: 'hidden', zIndex: 1 }}>
                <TableShowData />
            </div>
        </div>
    )
}

export default memo(HomeComponent);
