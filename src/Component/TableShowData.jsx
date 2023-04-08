import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Space } from 'antd';
import ButtonEdit from './ButtonEdit';
import TableFoot from './TableFoot';
import TableThead from './TableThead';

export default function TableShowData() {
    const [editMode, setEditmode] = useState(false)
    const [value, setValue] = useState({
        giaBan9999: '.000.000',
        giaMua9999: '.000.000',
        giaBan610: '.000.000',
        giaMua610: '.000.000',
    })
    const listArr = useMemo(() => {
        return [
            { id: 0, nameFirstTD: 'NT. 9999', listContent: [{ nameInput: 'giaBan9999' }, { nameInput: 'giaMua9999' }] },
            { id: 1, nameFirstTD: 'NT. 610', listContent: [{ nameInput: 'giaBan610' }, { nameInput: 'giaMua610' }] },
        ]
    }, [])

    const handleChange = useCallback((e) => {
        // let formatter = new Intl.NumberFormat("vn-vi");
        // formatter.format(e.target.value.replace(/,/g, ""))
        localStorage.setItem('BangGiaVang', JSON.stringify({
            ...value, [e.target.name]: e.target.value
        }))
        setValue({ ...value, [e.target.name]: e.target.value })
    }, [value])

    useEffect(() => {
        let listData = JSON.parse(localStorage.getItem('BangGiaVang'))
        if (localStorage.getItem('BangGiaVang')) {
            setEditmode(false)
            setValue(listData)//lưu lại value khi bấm sửa
        } else {
            setEditmode(true)
        }
    }, [])

    const themDuLieu = useCallback(() => {
        setEditmode(false)// đóng hiện giá 
    }, [])

    const cheDoEdit = useCallback((e) => {
        setEditmode(e)
    }, [])

    return (
        <section className='container-fluid'>
            <table className="table align-middle table-hover table-bordered mb-0 mt-3" >
                <thead>
                    <TableThead />
                </thead>
                <tbody className='text-center'>
                    {listArr.map((item) => {
                        return <tr style={{ fontSize: '30px', color: '#1677ff' }} key={item.id}>
                            <td>{item.nameFirstTD}</td>
                            {item.listContent.map((item2, index) => {
                                return <td key={index}>
                                    {!editMode ? <button className='btn btn boujee-text' onClick={() => {
                                        setEditmode(true)
                                    }}>{value[item2.nameInput]}</button> : <input className="form-control" value={value[item2.nameInput]} name={item2.nameInput} onChange={handleChange} />}
                                </td>
                            })}
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <TableFoot />
                </tfoot>
            </table>
            <ButtonEdit editMode={editMode} cheDoEdit={cheDoEdit} themDuLieu={themDuLieu} />
        </section>
    )
}

