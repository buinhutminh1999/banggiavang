import React, { useCallback, useMemo, useState } from 'react'
import TableFoot from './TableFoot';
import TableThead from './TableThead';
import ButtonEdit from './ButtonEdit';
import { style } from './style.css'
let listData = JSON.parse(localStorage.getItem('BangGiaVang'))
const listNull = {
    giaBan9999: '.000.000',
    giaMua9999: '.000.000',
    giaBan610: '.000.000',
    giaMua610: '.000.000',
}
export default function TableShowData() {
    const [editMode, setEditmode] = useState(false)
    const [value, setValue] = useState(listData ? listData : listNull)

    const listArr = useMemo(() => {
        return [
            { id: 0, nameFirstTD: 'NT. 9999', listContent: [{ nameInput: 'giaBan9999' }, { nameInput: 'giaMua9999' }] },
            { id: 1, nameFirstTD: 'NT. 610', listContent: [{ nameInput: 'giaBan610' }, { nameInput: 'giaMua610' }] },
        ]
    }, [])


    const handleChange = useCallback((e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }, [value])

    const themDuLieu = useCallback(() => {
        localStorage.setItem('BangGiaVang', JSON.stringify(value))
        setEditmode(false)// đóng hiện giá 
    }, [value]) // theo dõi biến value để lưu dữ liệu

    // const themDuLieu = useCallback(() => {
    // localStorage.setItem('BangGiaVang', JSON.stringify(value))
    //     setEditmode(false)// đóng hiện giá 
    // setBackupVal(value)
    // }, [value]) //theo dõi value để khi setState thì backupVal nhận được dữ liệu,
    //khi ko điền dependencies sẽ lưu giá trị ban đầu (init) của biến được khởi tạo, vì ko theo dõi được dependencies truyền vào 

    const cheDoEdit = useCallback((e) => {
        setEditmode(e)
    }, [])

    const huyBo = useCallback(() => {
        cheDoEdit(false)
        setValue(JSON.parse(localStorage.getItem('BangGiaVang')) ?? listNull) //đến khi hủy bỏ thì lấy lại dữ liệu cũ, dữ liệu cũ lấy từ localstorega hạn chế theo dõi dependencies
    }, [])

    return (
        <section className='container-fluid' >
            <table className="table align-middle table-hover table-bordered mb-0 mt-3" style={{background:'#D21312'}}>
                <thead>
                    <TableThead />
                </thead>
                <tbody className='text-center'>
                    {listArr.map((item) => {
                        return <tr style={{ fontSize: '30px' }} key={item.id}>
                            <td>{item.nameFirstTD}</td>
                            {item.listContent.map((item2, index) => {
                                return <td key={index}>
                                    {!editMode ? <button className='btn btn boujee-text' onClick={() => {
                                        cheDoEdit(true)
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
            <ButtonEdit
                huyBo={huyBo}
                themDuLieu={themDuLieu}
                editMode={editMode} />
        </section>
    )
}

