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
                    <div className='d-flex align-items-center gap-2'>
                        <span className='th-direction-pill pill-sell'>▲</span>
                        <span className='th-badge-sell'>GIÁ BÁN RA</span>
                    </div>
                    <span className='th-unit-tag tag-sell-unit'>ĐVT: VNĐ / CHỈ</span>
                </div>
            </th>
            <th className='th-price-col th-buy' style={{ width: '34%' }}>
                <div className='th-header-inner th-inner-buy'>
                    <div className='d-flex align-items-center gap-2'>
                        <span className='th-direction-pill pill-buy'>▼</span>
                        <span className='th-badge-buy'>GIÁ MUA VÀO</span>
                    </div>
                    <span className='th-unit-tag tag-buy-unit'>ĐVT: VNĐ / CHỈ</span>
                </div>
            </th>
        </tr>
    )
}
export default memo(TableThead)
