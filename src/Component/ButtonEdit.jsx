import { Space, Button } from 'antd'
import React, { memo } from 'react'

function ButtonEdit({ editMode, themDuLieu, huyBo }) {
    console.log('render')
    return (
        <>
            {editMode
                ? <Space wrap className='mt-3'>
                    < Button type="primary" onClick={themDuLieu} > Thêm dữ liệu</Button >
                    <Button type="primary" onClick={huyBo}>Hủy bỏ</Button>
                </Space >
                : null
            }
        </>
    )
}

export default memo(ButtonEdit)
