import React, { memo, useEffect, useState } from 'react'
import { Button, Space } from 'antd';
let listData = JSON.parse(localStorage.getItem('BangGiaVang'))

let listArr = [
    { id: 0, nameFirstTD: 'NT. 9999', listContent: [{ nameInput: 'giaBan9999' }, { nameInput: 'giaMua9999' }] },
    { id: 1, nameFirstTD: 'NT. 610', listContent: [{ nameInput: 'giaBan610' }, { nameInput: 'giaMua610' }] },
]
function TableShowData() {
    const [editMode, setEditmode] = useState(false)
    const [value, setValue] = useState({
        giaBan9999: '.000.000',
        giaMua9999: '.000.000',
        giaBan610: '.000.000',
        giaMua610: '.000.000',
    })

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const cheDoEdit = (e) => {
        setEditmode(e)
    }
    useEffect(() => {
        if (localStorage.getItem('BangGiaVang')) {
            setEditmode(false)
            setValue(listData)//lưu lại value khi bấm sửa
        } else {
            setEditmode(true)
        }
    }, [])

    const themDuLieu = () => {
        setValue(value)
        setEditmode(false)
        localStorage.setItem('BangGiaVang', JSON.stringify(value))
    }
    console.log('value', value)
    return (
        <>
            {/* style={{ background: '#FBFFB1' }} */}
            <table className="table align-middle  table-hover table-bordered mb-0 mt-3" >
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th style={{ fontSize: '30px', color: '#1677ff' }}>BÁN RA</th>
                        <th style={{ fontSize: '30px', color: '#1677ff' }}>MUA VÀO</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {listArr.map((item) => {
                        return <tr style={{ fontSize: '30px', color: '#1677ff' }} key={item.id}>
                            <td>{item.nameFirstTD}</td>
                            {item.listContent.map((item2, index) => {
                                return <td key={index}>
                                    {!editMode ? <button style={{ color: 'rgb(254, 140, 0)', fontSize: '70px' }} className='btn btn' onClick={() => {
                                        setEditmode(true)
                                    }}>{value[item2.nameInput]}</button> : <input className="form-control" defaultValue={value[item2.nameInput]} name={item2.nameInput} onChange={handleChange} />}
                                </td>
                            })}
                        </tr>
                    })}

                </tbody>
            </table>
            {editMode
                ? <Space wrap className='mt-3'>
                    <Button type="primary" onClick={themDuLieu}>Thêm dữ liệu</Button>
                    <Button type="primary" onClick={() => {
                        cheDoEdit(false)
                    }}>Hủy bỏ</Button>

                </Space>
                : null}
        </>
    )
}

export default memo(TableShowData)