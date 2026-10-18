import React, { memo } from 'react'
import Marquee from "react-fast-marquee";

function TableFoot({ slogan }) {
    const defaultSlogan = "★ HÂN HẠNH PHỤC VỤ QUÝ KHÁCH ★ LÃI SUẤT CẦM ĐỒ THẤP NHẤT THỊ TRƯỜNG ★ MUA BÁN TRAO ĐỔI CÁC LOẠI VÀNG 24K - 18K ★ UY TÍN - CHẤT LƯỢNG - TẬN TÂM ★";
    const textToDisplay = slogan && slogan.trim() !== "" ? slogan : defaultSlogan;

    return (
        <tr className='text-center ticker-tr'>
            <td colSpan={3} className='p-0 border-0 pt-2'>
                <div className='luxury-ticker-ribbon'>
                    <div className='ticker-badge-pill'>
                        <span className='ticker-badge-dot'></span>
                        <span className='ticker-badge-text'>THÔNG BÁO</span>
                    </div>
                    <div className='ticker-marquee-viewport'>
                        <Marquee speed={70} gradient={false} className='ticker-marquee-content'>
                            {textToDisplay}
                        </Marquee>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default memo(TableFoot)
