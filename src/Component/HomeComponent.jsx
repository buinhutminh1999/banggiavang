import React, { memo } from 'react';
import './style.css';
import DataCurrentTime from './DataCurrentTime';
import TableShowData from './TableShowData';
import GoldParticles from './GoldParticles';
import WeatherWidget from './WeatherWidget';

function HomeComponent() {
    return (
        <div className='d-flex flex-column position-relative' style={{ height: '100vh', padding: '1vh 2vw', overflow: 'hidden' }}>
            <GoldParticles />

            {/* TV Header: More Compact, Horizontal */}
            <header className='container-fluid header mb-3 d-flex justify-content-between align-items-center position-relative' style={{ zIndex: 1 }}>
                <div className='d-flex align-items-center gap-4'>
                    <h2 className='dntn m-0' style={{ fontSize: '3vh' }}>DNTN</h2>
                    <div className='d-flex flex-column'>
                        <p style={{ fontSize: '4vh', margin: 0, lineHeight: 1.2 }} className="animate-charcter">TIỆM VÀNG</p>
                        <p style={{ fontSize: '6vh', fontWeight: '900', lineHeight: 1.3, margin: 0, letterSpacing: '2px' }} className="animate-charcter">PHƯƠNG THẢO</p>
                    </div>
                </div>

                <div className='d-flex align-items-center gap-4'>
                    <WeatherWidget />
                    <div className='text-end'>
                        <DataCurrentTime />
                    </div>

                    {/* Payment QR Code */}
                    <div className="qr-card">
                        <img
                            src="https://img.vietqr.io/image/970449-026809130001-compact.jpg?amount=0&addInfo=Tiệm Vàng Phương Thảo&accountName=TRAN THI PHUONG THAO"
                            alt="QR Payment"
                            style={{ width: '220px', height: '220px' }}
                        />
                        <div style={{ fontSize: '1.4vh', fontWeight: 'bold', color: '#002f5e', marginTop: '4px', textAlign: 'center' }}>
                            LPBANK - 026809130001<br />
                            <span style={{ fontSize: '1.2vh', color: '#d32f2f' }}>TRAN THI PHUONG THAO</span>
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
