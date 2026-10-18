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
        <div className='status-capsule time-capsule d-flex align-items-center gap-3'>
            <div className='d-flex flex-column text-end justify-content-center'>
                <div className='calendar-date'>
                    <span className='date-prefix'>HÔM NAY: </span>
                    <span className='date-val'>{date.toLocaleDateString('vi-VN')}</span>
                </div>
                {lunarDate && (
                    <div className='lunar-date'>
                        🌙 {lunarDate}
                    </div>
                )}
            </div>
            <div className='capsule-divider'></div>
            <div className='digital-clock-display'>
                {date.toLocaleTimeString('vi-VN')}
            </div>
        </div>
    )
}

export default memo(DataCurrentTime)
