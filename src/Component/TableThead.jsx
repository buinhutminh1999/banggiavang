import React, { memo } from 'react'

function TableThead() {
    return (
        <tr className='text-center thead-row'>
            <th className='th-gold-col' style={{ width: '30%' }}>
                <div className='th-header-inner'>
                    <span className='th-icon'>💎</span>
                    <span className='th-title'>LOẠI VÀNG</span>
                </div>
            </th>
            <th className='th-price-col th-sell' style={{ width: '35%' }}>
                <div className='th-header-inner'>
                    <span className='th-badge-sell'>BÁN RA</span>
                    <span className='th-unit-tag'>VNĐ / CHỈ</span>
                </div>
            </th>
            <th className='th-price-col th-buy' style={{ width: '35%' }}>
                <div className='th-header-inner'>
                    <span className='th-badge-buy'>MUA VÀO</span>
                    <span className='th-unit-tag'>VNĐ / CHỈ</span>
                </div>
            </th>
        </tr>
    )
}
export default memo(TableThead)