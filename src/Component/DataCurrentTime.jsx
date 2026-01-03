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
        <div className='glass-pill text-end text-white'>
            <div style={{ fontSize: '2.5vh', fontWeight: '500', letterSpacing: '1px' }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>HÔM NAY: </span>
                {date.toLocaleDateString('vi-VN')}
            </div>
            {lunarDate && (
                <div style={{ fontSize: '2vh', color: 'var(--text-secondary)', fontStyle: 'italic', fontWeight: 'bold' }}>
                    {lunarDate}
                </div>
            )}
            <div style={{ fontSize: '3vh', fontWeight: '800', marginTop: '5px', fontVariantNumeric: 'tabular-nums', letterSpacing: '2px' }}>
                {date.toLocaleTimeString('vi-VN')}
            </div>
        </div>
    )
}

export default memo(DataCurrentTime)
