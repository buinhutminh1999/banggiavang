import React, { memo, useEffect, useState } from 'react'
import lunisolar from 'lunisolar'

function DataCurrentTime() {
    const [date, setDate] = useState(new Date());
    const [lunarDate, setLunarDate] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setDate(now);
            try {
                const lunar = lunisolar(now);
                // lunisolar uses .lunar.day and .lunar.month
                const day = lunar.lunar.day;
                const month = lunar.lunar.month;
                setLunarDate(`Ngày ${day} Tháng ${month} Âm Lịch`);
            } catch (error) {
                console.error('Lunar date error:', error);
                setLunarDate('');
            }
        }

        updateTime();
        let timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='glass-pill text-end' style={{ color: '#00e676' }}> {/* Material Green */}
            <div style={{ fontSize: '3vh', fontWeight: '500', letterSpacing: '1px' }}>
                <span style={{ color: '#00e676', fontWeight: 'bold' }}>HÔM NAY: </span>
                {date.toLocaleDateString('vi-VN')}
            </div>
            {lunarDate && (
                <div style={{ fontSize: '2.5vh', color: '#69f0ae', fontStyle: 'italic', fontWeight: 'bold', whiteSpace: 'nowrap' }}> {/* Lighter Green for subtext */}
                    {lunarDate}
                </div>
            )}
            <div style={{ fontSize: '5.5vh', fontWeight: '800', marginTop: '5px', fontVariantNumeric: 'tabular-nums', letterSpacing: '2px', lineHeight: 1 }}>
                {date.toLocaleTimeString('vi-VN')}
            </div>
        </div>
    )
}

export default memo(DataCurrentTime)
