import React, { memo, useEffect, useState } from 'react'
import lunisolar from 'lunisolar'

const DAYS_VI = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];

function DataCurrentTime() {
    const [date, setDate] = useState(new Date());
    const [lunarDate, setLunarDate] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setDate(now);
            try {
                const lunar = lunisolar(now);
                const day = String(lunar.lunar.day).padStart(2, '0');
                const month = String(lunar.lunar.month).padStart(2, '0');
                setLunarDate(`Âm lịch: ${day}/${month}`);
            } catch (error) {
                console.error('Lunar date error:', error);
                setLunarDate('');
            }
        }

        updateTime();
        let timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const dayName = DAYS_VI[date.getDay()];
    const formattedDate = date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('vi-VN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <div className='royal-status-pod time-pod d-flex align-items-center'>
            <div className='d-flex flex-column text-end justify-content-center time-calendar-col'>
                <div className='calendar-date'>
                    <span className='date-day-badge'>{dayName}</span>
                    <span className='date-val'>{formattedDate}</span>
                </div>
                {lunarDate && (
                    <div className='lunar-date'>
                        <span className="lunar-icon">✦</span> {lunarDate}
                    </div>
                )}
            </div>
            <div className='capsule-divider'></div>
            <div className='clock-wrapper d-flex flex-column align-items-center justify-content-center'>
                <div className='digital-clock-display'>
                    {formattedTime}
                </div>
                <span className='clock-live-tag'>GIỜ CẬP NHẬT TRỰC TIẾP</span>
            </div>
        </div>
    )
}

export default memo(DataCurrentTime)
