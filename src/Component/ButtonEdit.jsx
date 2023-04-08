import { Space, Button } from 'antd'
import React, { memo } from 'react'

function ButtonEdit({ editMode, cheDoEdit, themDuLieu }) {
    return (
        <>
            {editMode
                ? <Space wrap className='mt-3'>
                    < Button type="primary" onClick={themDuLieu} > Thêm dữ liệu</Button >
                    <Button type="primary" onClick={() => { cheDoEdit(false) }}>Hủy bỏ</Button>
                </Space >
                : null
            }
        </>
    )
}

export default memo(ButtonEdit)
