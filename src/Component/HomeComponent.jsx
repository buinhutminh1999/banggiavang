import React from 'react';
// khi click vào th render input có 2 giá trị
import { style } from './style.css'
import DataCurrentTime from './DataCurrentTime';
import TableShowData from './TableShowData';

export default function HomeComponent() {
    return (
        <div className='d-flex flex-column justify-content-center' style={{height: '100vh'}}>
            <header className='container-fluid' style={{ cursor: 'pointer', backgroundImage: 'linear-gradient(to right, #141E30 0%, #243B55 51%, #141E30 100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', fontWeight: '800' }} >
                <div className='text-danger header' style={{ background: '#ED2B2A' }}>
                    <div className='d-flex' style={{ position: 'relative' }}>
                        <div className="content">
                            <h1 className='dntn'>DNTN</h1>
                        </div>
                        <h1 style={{ color: '#F09819', position: 'absolute' }} className='text-center w-100'>
                            <p style={{ fontSize: '60px' }} className="animate-charcter m-0">TIỆM VÀNG</p>
                            <br />
                            <p style={{ fontSize: '85px' }} className="animate-charcter">PHƯƠNG THẢO</p>
                        </h1>
                    </div>
                    <br />
                    <DataCurrentTime />
                </div>
                <div>
                </div>
            </header>

            <TableShowData />

        </div>

    )
}
