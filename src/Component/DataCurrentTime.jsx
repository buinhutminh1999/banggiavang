import React, { memo, useEffect, useState } from 'react'

function DataCurrentTime() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <p style={{ fontSize: '30px', color: '#1677ff', marginTop: '70px' }}>Tỷ giá vàng trong 24H NGÀY {date.toLocaleDateString('vi-VN')} - {date.toLocaleTimeString('vi-VN')}</p>
    )
}

export default memo(DataCurrentTime)
