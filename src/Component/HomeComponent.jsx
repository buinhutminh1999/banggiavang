import React, { useContext, useEffect, useState } from 'react';
// khi click vào th render input có 2 giá trị
import { Button, Space  } from 'antd';

let listData = JSON.parse(localStorage.getItem('BangGiaVang'))
let arrNull = [
    { id: 0, status: false, namePlacehoder: 'Gía mua 9999', type: 'input', name: 'giaMua9999' },
    { id: 1, status: false, namePlacehoder: 'Gía bán 9999', type: 'input', name: 'giaBan9999' },
    { id: 2, status: false, namePlacehoder: 'Gía mua 610', type: 'input', name: 'giaMua610' },
    { id: 3, status: false, namePlacehoder: 'Gía bán 610', type: 'input', name: 'giaBan610' },
]

export default function HomeComponent() {
    const [data, setData] = useState()
    const [editMode, setEditmode] = useState(false)
    const [value, setValue] = useState({
        giaMua9999: '',
        giaBan9999: '',
        giaMua610: '',
        giaBan610: ''
    })
    const [date, setDate] = useState(new Date());

    const getCurrenDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return today = dd + '/' + mm + '/' + yyyy;
    }

    const handleChange = (e) => {
        setValue((preState) => {
            return { ...preState, [e.target.name]: e.target.value }
        })
    }
    useEffect(() => {
        if (localStorage.getItem('BangGiaVang')) {
            //nếu có dữ liệu
            setData(
                listData
            )
            setValue(listData)
        } else {
            setData(null)
        }

    }, [])

    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, [date]);
    useEffect(() => {
        let a = setInterval(() => setData(JSON.parse(localStorage.getItem('BangGiaVang'))), 1000);
        return function cleanup() {
            clearInterval(a);
        };
    }, [data])
    return (
        <div className='container-fluid ' style={{ minHeight: '100vh', cursor: 'pointer', backgroundImage: 'linear-gradient(to right, #141E30 0%, #243B55 51%, #141E30 100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
            <div className=' text-danger'>
                <div className='d-flex' style={{ position: 'relative' }}>
                    <h1 style={{ color: '#00d2ff' }}>DNTN</h1>
                    <h1 style={{ color: '#F09819', position: 'absolute' }} className='text-center w-100'>TIỆM VÀNG
                        <br />
                        <span style={{ fontSize: '65px' }} className='text-center text-danger'>PHƯƠNG THẢO</span>
                    </h1>
                </div>

                <p style={{ fontSize: '30px', color: 'white', marginTop: '70px' }}>Tỷ giá vàng trong 24H NGÀY {getCurrenDate()} - {date.toLocaleTimeString()}</p>
            </div>
            <table className="table align-middle table-dark table-hover table-bordered mb-0 mt-3" >
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th style={{ fontSize: '30px' }}>MUA VÀO</th>
                        <th style={{ fontSize: '30px' }}>BÁN RA</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr>
                        <td style={{ fontSize: '30px' }}>NT 9999</td>
                        <td>{data == null || editMode
                            ? <input type={'text'} className="form-control" defaultValue={data?.giaMua9999} name={arrNull[0].name} placeholder={arrNull[0].namePlacehoder} onChange={handleChange} />
                            : <button style={{ backgroundImage: 'linear-gradient(to right, #fe8c00 0%, #f83600 51%, #fe8c00 100%)', fontSize: '65px' }} className='btn btn-danger' onClick={() => { setEditmode(true) }}>{data.giaMua9999}</button>}</td>
                        <td>{data == null || editMode
                            ? <input type={'text'} className="form-control" defaultValue={data?.giaBan9999} name={arrNull[1].name} placeholder={arrNull[1].namePlacehoder} onChange={handleChange} />
                            : <button style={{ backgroundImage: 'linear-gradient(to right, #fe8c00 0%, #f83600 51%, #fe8c00 100%)', fontSize: '65px' }} className='btn btn-danger' onClick={() => { setEditmode(true) }}>{data.giaBan9999}</button>}</td>
                    </tr>
                    <tr>
                        <td style={{ fontSize: '30px' }}>NT 610</td>
                        <td>{data == null || editMode
                            ? <input type={'text'} className="form-control" defaultValue={data?.giaMua610} name={arrNull[2].name} placeholder={arrNull[2].namePlacehoder} onChange={handleChange} />
                            : <button style={{ backgroundImage: 'linear-gradient(to right, #fe8c00 0%, #f83600 51%, #fe8c00 100%)', fontSize: '65px' }} className='btn btn-danger' onClick={() => { setEditmode(true) }}>{data.giaMua610}</button>}</td>
                        <td>{data == null || editMode
                            ? <input type={'text'} className="form-control" defaultValue={data?.giaBan610} name={arrNull[3].name} placeholder={arrNull[3].namePlacehoder} onChange={handleChange} />
                            : <button style={{ backgroundImage: 'linear-gradient(to right, #fe8c00 0%, #f83600 51%, #fe8c00 100%)', fontSize: '65px' }} className='btn btn-danger' onClick={() => { setEditmode(true) }}>{data.giaBan610}</button>}</td>
                    </tr>
                    <tr className='text-center'>
                        <td colSpan={3}>
                            <h1 style={{ color: '#00c6ff' }}>CẦM ĐỒ</h1>
                            <h1 style={{ color: '#f46b45' }}>LÃI SUẤT 3% THÁNG</h1>
                        </td>
                    </tr>
                </tbody>

            </table>

            {data == null || editMode
                ? <Space wrap className='mt-3'>
                    <Button type="primary" onClick={() => {
                        setData(value)
                        setEditmode(false)
                        localStorage.setItem('BangGiaVang', JSON.stringify(value))
                    }}>Thêm dữ liệu</Button>
                    <Button type="primary" onClick={() => {
                        setEditmode(false)
                    }}>Hủy bỏ</Button>
                    
                </Space>
                : null}
            <div>
              
            </div>
        </div>


    )
}
