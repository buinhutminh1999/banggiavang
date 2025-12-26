import React, { memo } from 'react'

function TableThead() {
    return (
        <tr className='text-center'>
            <th style={{ width: '30%' }}>💎 LOẠI VÀNG</th>
            <th>📤 BÁN RA</th>
            <th>📥 MUA VÀO</th>
        </tr>
    )
}
export default memo(TableThead)