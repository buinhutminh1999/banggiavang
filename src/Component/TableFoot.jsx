import React, { memo } from 'react'

 function TableFoot() {
    return (
        <tr className='text-center'>
            <td colSpan={3} style={{ color: '#1677ff' }}>
                <h1 >CẦM ĐỒ</h1>
                <h1>LÃI SUẤT 3% THÁNG</h1>
            </td>
        </tr>
    )
}

export default memo(TableFoot)
