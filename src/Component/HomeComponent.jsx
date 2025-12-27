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
        <div className='d-flex flex-column position-relative' style={{ height: '100vh', padding: '1vh 2vw', overflow: 'hidden' }}>
            <GoldParticles />

            {/* TV Header: More Compact, Horizontal */}
            <header className='container-fluid header mb-3 d-flex justify-content-between align-items-center position-relative' style={{ zIndex: 1 }}>
                <div className='d-flex flex-column justify-content-center text-center'>
                    <h2 className='dntn m-0' style={{ fontSize: '4vh', lineHeight: '1.4', paddingBottom: '0.2vh' }}>DNTN TIỆM VÀNG</h2>

                    {/* Decorative Divider */}
                    <div className='d-flex align-items-center justify-content-center mb-0' style={{ opacity: 0.8 }}>
                        <span style={{ height: '2px', width: '6vh', background: 'linear-gradient(90deg, transparent, var(--accent-color))' }}></span>
                        <span style={{ color: 'var(--accent-color)', margin: '0 10px', fontSize: '2.5vh', lineHeight: 1 }}>♦</span>
                        <span style={{ height: '2px', width: '6vh', background: 'linear-gradient(270deg, transparent, var(--accent-color))' }}></span>
                    </div>

                    <p style={{ fontSize: '8vh', fontWeight: '800', lineHeight: 1.5, margin: 0, letterSpacing: '3px', paddingBottom: '1vh', display: 'block' }} className="animate-charcter">PHƯƠNG THẢO</p>
                </div>

                <div className='d-flex align-items-center gap-4'>
                    <WeatherWidget />
                    <div className='text-end'>
                        <DataCurrentTime />
                    </div>

                    {/* Payment QR Code */}
                    <div className="qr-card position-relative" style={{ padding: '15px' }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            border: '2px dashed var(--accent-color)', borderRadius: '16px',
                            pointerEvents: 'none', opacity: 0.5
                        }}></div>

                        <div style={{ textAlign: 'center', marginBottom: '5px' }}>
                            <span className='glass-pill' style={{ fontSize: '1.5vh', padding: '2px 10px', fontWeight: 'bold', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                                🆙 QUÉT MÃ
                            </span>
                        </div>

                        <img
                            src="https://img.vietqr.io/image/970449-026809130001-compact.jpg?amount=0&addInfo=Tiệm Vàng Phương Thảo&accountName=TRAN THI PHUONG THAO"
                            alt="QR Payment"
                            style={{ width: '180px', height: '180px', borderRadius: '8px' }}
                        />
                        <div style={{ fontSize: '2.0vh', fontWeight: 'bold', color: '#002f5e', marginTop: '8px', textAlign: 'center' }}>
                            LPBANK - 026809130001<br />
                            <span style={{ fontSize: '1.6vh', color: '#d32f2f' }}>TRAN THI PHUONG THAO</span>
                        </div>
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
