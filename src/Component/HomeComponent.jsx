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
                }
            } catch (err) {
                // Silent fallback if Wake Lock is unsupported or blocked
            }
        };

        requestWakeLock();

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
        <div className={`d-flex flex-column tv-screen-container position-relative ${isSunlightMode ? 'sunlight-mode' : ''}`}>
            {/* Ambient Royal Gold & Crimson Light Leaks */}
            <div className="ambient-glow top-center"></div>
            <div className="ambient-glow bottom-ruby"></div>

            {/* Ornate Imperial Corner Borders */}
            <div className="royal-frame-border"></div>

            {/* Disable particles in Sunlight Mode for maximum clarity */}
            {!isSunlightMode && <GoldParticles />}

            {/* Royal Architectural TV Header */}
            <header className='container-fluid vip-header d-flex justify-content-between align-items-center position-relative'>
                {/* Left: Brand Identity with Imperial Crest */}
                <div className='d-flex align-items-center gap-3 brand-identity-group'>
                    <div className='brand-emblem-badge'>
                        <svg className="royal-crest-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Outer Octagonal/Shield Halo */}
                            <circle cx="32" cy="32" r="29" stroke="url(#goldRim)" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.75" />
                            {/* Diamond Facet Backing */}
                            <path d="M32 6L54 24L32 58L10 24L32 6Z" fill="url(#rubyCore)" stroke="url(#goldRim)" strokeWidth="1.5" />
                            {/* Imperial Crown */}
                            <path d="M14 42L10 20L23 30L32 14L41 30L54 20L50 42H14Z" fill="url(#crownGold)" stroke="#FFFDF0" strokeWidth="1.4" strokeLinejoin="round" />
                            {/* Crown Base Band */}
                            <rect x="14" y="45" width="36" height="6" rx="3" fill="url(#crownGold)" stroke="#FFF8DC" strokeWidth="1" />
                            {/* Crown Jewels */}
                            <circle cx="32" cy="11" r="3" fill="#FFFDE7" />
                            <circle cx="10" cy="17.5" r="2.3" fill="#FFFDE7" />
                            <circle cx="54" cy="17.5" r="2.3" fill="#FFFDE7" />
                            <circle cx="23" cy="36" r="2" fill="#D50000" stroke="#FFF8DC" strokeWidth="0.8" />
                            <circle cx="32" cy="35" r="2.5" fill="#00E676" stroke="#FFF8DC" strokeWidth="0.8" />
                            <circle cx="41" cy="36" r="2" fill="#D50000" stroke="#FFF8DC" strokeWidth="0.8" />
                            <defs>
                                <linearGradient id="crownGold" x1="10" y1="12" x2="54" y2="52" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#FFFDF2" />
                                    <stop offset="30%" stopColor="#FFE066" />
                                    <stop offset="65%" stopColor="#FFB300" />
                                    <stop offset="100%" stopColor="#C67C00" />
                                </linearGradient>
                                <linearGradient id="goldRim" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#FFF8DC" />
                                    <stop offset="50%" stopColor="#FFD700" />
                                    <stop offset="100%" stopColor="#996515" />
                                </linearGradient>
                                <radialGradient id="rubyCore" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#800016" stopOpacity="0.85" />
                                    <stop offset="100%" stopColor="#2B0006" stopOpacity="0.95" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className='d-flex flex-column justify-content-center text-start brand-text-stack'>
                        <div className='d-flex align-items-center gap-3 flex-wrap'>
                            <span className='brand-sub-heading'>
                                <span className='gold-star-ornament'>✦</span> DNTN TIỆM VÀNG <span className='gold-star-ornament'>✦</span>
                            </span>
                            <div className='tccs-badge-pill'>
                                <span className='tccs-dot-indicator'></span>
                                <span className='tccs-text-code'>TCCS 01:2026/PT</span>
                            </div>
                        </div>
                        <h1 className='brand-main-title m-0' data-text="PHƯƠNG THẢO">PHƯƠNG THẢO</h1>
                    </div>
                </div>

                {/* Right: Royal Status Center (Weather & Live Tabular Clock) */}
                <div className='d-flex align-items-stretch gap-2 status-console-group'>
                    <WeatherWidget onWeatherUpdate={handleWeatherUpdate} />
                    <DataCurrentTime />
                </div>
            </header>

            {/* Main Gold Price Board */}
            <main className='flex-grow-1 d-flex flex-column' style={{ overflow: 'hidden', zIndex: 1, minHeight: 0 }}>
                <TableShowData />
            </main>
        </div>
    )
}

export default memo(HomeComponent);
