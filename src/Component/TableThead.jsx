import React, { memo } from 'react'

function TableThead() {
    return (
        <tr className='text-center thead-row'>
            <th className='th-gold-col' style={{ width: '32%' }}>
                <div className='th-header-inner th-inner-gold'>
                    <span className='th-ornament-icon'>❖</span>
                    <span className='th-title'>LOẠI VÀNG</span>
                    <span className='th-ornament-icon'>❖</span>
                </div>
            </th>
            <th className='th-price-col th-sell' style={{ width: '34%' }}>
                <div className='th-header-inner th-inner-sell'>
                    <div className='d-flex align-items-center justify-content-center gap-2'>
                        <span className='th-badge-sell'>GIÁ BÁN RA</span>
                        <span className='th-unit-tag tag-sell-unit'>VNĐ/CHỈ</span>
                    </div>
                </div>
            </th>
            <th className='th-price-col th-buy' style={{ width: '34%' }}>
                <div className='th-header-inner th-inner-buy'>
                    <div className='d-flex align-items-center justify-content-center gap-2'>
                        <span className='th-badge-buy'>GIÁ MUA VÀO</span>
                        <span className='th-unit-tag tag-buy-unit'>VNĐ/CHỈ</span>
                    </div>
                </div>
            </th>
        </tr>
    )
}
export default memo(TableThead)
