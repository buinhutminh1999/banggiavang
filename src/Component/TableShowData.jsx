// TableShowData: Displays real-time prices with glassmorphism UI
import React, { useMemo, useState, useEffect } from 'react'
import TableFoot from './TableFoot';
import TableThead from './TableThead';
import { AnimatePresence } from 'framer-motion';
import PriceRow from './PriceRow';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const listNull = {
    giaBan9999: '0',
    giaMua9999: '0',
    giaBan610: '0',
    giaMua610: '0',
}

export default function TableShowData() {
    const [value, setValue] = useState(() => {
        // Try to load from localStorage first
        const cached = localStorage.getItem('gold_prices');
        return cached ? JSON.parse(cached) : null;
    });
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Monitor Online Status
    useEffect(() => {
        const handleStatusChange = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, []);

    // Listen to Firestore for real-time updates
    useEffect(() => {
        const pricesDoc = doc(db, 'settings', 'prices');
        const unsubscribe = onSnapshot(pricesDoc,
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setValue(data);
                    // Cache to localStorage for offline use
                    localStorage.setItem('gold_prices', JSON.stringify(data));
                } else {
                    setValue(listNull);
                }
            },
            (error) => {
                // Silent error handling
            }
        );
        return () => unsubscribe();
    }, []);

    const listArr = useMemo(() => {
        return [
            { id: 0, nameFirstTD: 'VÀNG 9999', listContent: [{ nameInput: 'giaBan9999' }, { nameInput: 'giaMua9999' }] },
            { id: 1, nameFirstTD: 'VÀNG 610', listContent: [{ nameInput: 'giaBan610' }, { nameInput: 'giaMua610' }] },
        ]
    }, [])

    if (!value) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 flex-column">
                <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <h3 className="mt-3 text-white animate-charcter">⏳ Đang cập nhật dữ liệu...</h3>
            </div>
        );
    }

    return (
        <section className='container-fluid h-100 p-0 position-relative'>
            {/* Live Status Indicator */}
            <div className="live-indicator" style={{
                position: 'absolute',
                top: '15px',
                left: '20px',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: isOnline ? '#4CAF50' : '#f44336',
                    boxShadow: isOnline ? '0 0 10px #4CAF50' : '0 0 10px #f44336',
                    animation: 'pulse-live 2s infinite'
                }}></span>
                <span style={{
                    fontSize: '1.5vh',
                    color: isOnline ? '#4CAF50' : '#f44336',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    {isOnline ? 'LIVE' : 'OFFLINE'}
                </span>
            </div>

            <div className='glass-panel p-3 d-flex flex-column h-100'>
                <table className="table align-middle table-bordered mb-0 custom-table h-100">
                    <thead>
                        <TableThead />
                    </thead>
                    <tbody className='text-center'>
                        <AnimatePresence>
                            {listArr.map((item, index) => (
                                <PriceRow
                                    key={item.id}
                                    item={item}
                                    value={value}
                                    editMode={false}
                                    cheDoEdit={() => { }}
                                    handleValueChange={() => { }}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </tbody>
                    <tfoot>
                        <TableFoot slogan={value?.slogan} />
                    </tfoot>
                </table>
            </div>
        </section>
    )
}
