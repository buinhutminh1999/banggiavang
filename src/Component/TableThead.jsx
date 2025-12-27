import React, { memo } from 'react'

function TableThead() {
    return (
        <tr className='text-center'>
            <th style={{ width: '30%' }}>💎 LOẠI VÀNG</th>
            <th className='th-sell'>📤 BÁN RA</th>
            <th className='th-buy'>📥 MUA VÀO</th>
        </tr>
    )
}
export default memo(TableThead)