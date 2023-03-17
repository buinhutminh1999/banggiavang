import React from 'react';
// khi click vào th render input có 2 giá trị
import { style } from './style.css'
import DataCurrentTime from './DataCurrentTime';
import TableShowData from './TableShowData';

export default function HomeComponent() {
    return (
        <div className='container-fluid' style={{ minHeight: '100vh', cursor: 'pointer', backgroundImage: 'linear-gradient(to right, #141E30 0%, #243B55 51%, #141E30 100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', fontWeight: '800' }} >
            <div className='text-danger header' >
                <div className='d-flex' style={{ position: 'relative' }}>
                    <div class="content">
                        <h1 className='dntn'>DNTN</h1>
                    </div>
                    <h1 style={{ color: '#F09819', position: 'absolute' }} className='text-center w-100'>
                        <p style={{ fontSize: '60px' }} class="animate-charcter m-0">TIỆM VÀNG</p>
                        <br />
                        <p style={{ fontSize: '85px' }} class="animate-charcter">PHƯƠNG THẢO</p>
                    </h1>
                </div>
                <br />
                <DataCurrentTime />
            </div>
            <TableShowData />
            <div>

            </div>
        </div>


    )
}
