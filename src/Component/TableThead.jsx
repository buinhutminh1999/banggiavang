import React, { memo } from 'react'

function TableThead() {
    return (
        <tr className='text-center'>
            <th></th>
            <th style={{ fontSize: '30px' }}>BÁN RA</th>
            <th style={{ fontSize: '30px' }}>MUA VÀO</th>
        </tr>
    )
}
export default memo(TableThead)