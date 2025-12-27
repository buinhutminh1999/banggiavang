import React, { memo } from 'react'
import Marquee from "react-fast-marquee";

function TableFoot({ slogan }) {
    const defaultSlogan = "★ HÂN HẠNH PHỤC VỤ QUÝ KHÁCH ★ LÃI SUẤT CẦM ĐỒ THẤP NHẤT THỊ TRƯỜNG ★ MUA BÁN TRAO ĐỔI CÁC LOẠI VÀNG 24K - 18K ★ UY TÍN - CHẤT LƯỢNG - TẬN TÂM ★";
    const textToDisplay = slogan && slogan.trim() !== "" ? slogan : defaultSlogan;

    return (
        <tr className='text-center'>
            <td colSpan={3} className='py-3 p-0 border-0'>
                <div className='d-flex align-items-center' style={{
                    background: 'linear-gradient(90deg, #990000 0%, #D21312 50%, #990000 100%)',
                    height: '10vh',
                    borderTop: '3px solid var(--accent-color)',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    boxShadow: '0 -4px 10px rgba(0,0,0,0.2)'
                }}>
                    <Marquee speed={80} gradient={false} className='text-white fw-bold' style={{ fontSize: '4.5vh', letterSpacing: '2px' }}>
                        {textToDisplay}
                    </Marquee>
                </div>
            </td>
        </tr>
    )
}

export default memo(TableFoot)
