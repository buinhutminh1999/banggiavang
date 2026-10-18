// TableShowData: Displays real-time prices with glassmorphism UI
import React, { useMemo, useState, useEffect } from 'react'
import TableFoot from './TableFoot';
import TableThead from './TableThead';
import { AnimatePresence } from 'framer-motion';
import PriceRow from './PriceRow';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const listNull = {
    giaBan999: '0',
    giaMua999: '0',
    giaBan610: '0',
    giaMua610: '0',
    giaBan600: '0',
    giaMua600: '0',
}

export default function TableShowData() {
    const [value, setValue] = useState(() => {
        // Try to load from localStorage first
        const cached = localStorage.getItem('gold_prices');
        if (cached) {
            try {
                const raw = JSON.parse(cached);
                return {
                    ...raw,
                    giaBan999: raw.giaBan999 ?? raw.giaBan9999 ?? '0',
                    giaMua999: raw.giaMua999 ?? raw.giaMua9999 ?? '0',
                    giaBan610: raw.giaBan610 ?? '0',
                    giaMua610: raw.giaMua610 ?? '0',
                    giaBan600: raw.giaBan600 ?? '0',
                    giaMua600: raw.giaMua600 ?? '0',
                };
            } catch (e) {
                return null;
            }
        }
        return null;
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
                    const raw = docSnap.data();
                    const data = {
                        ...raw,
                        giaBan999: raw.giaBan999 ?? raw.giaBan9999 ?? '0',
                        giaMua999: raw.giaMua999 ?? raw.giaMua9999 ?? '0',
                        giaBan610: raw.giaBan610 ?? '0',
                        giaMua610: raw.giaMua610 ?? '0',
                        giaBan600: raw.giaBan600 ?? '0',
                        giaMua600: raw.giaMua600 ?? '0',
                    };
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
            {
                id: 0,
                nameFirstTD: 'VÀNG 999',
                listContent: [{ nameInput: 'giaBan999', type: 'sell' }, { nameInput: 'giaMua999', type: 'buy' }]
            },
            {
                id: 1,
                nameFirstTD: 'VÀNG 610',
                listContent: [{ nameInput: 'giaBan610', type: 'sell' }, { nameInput: 'giaMua610', type: 'buy' }]
            },
            {
                id: 2,
                nameFirstTD: 'VÀNG 600',
                listContent: [{ nameInput: 'giaBan600', type: 'sell' }, { nameInput: 'giaMua600', type: 'buy' }]
            },
        ]
    }, [])

    if (!value) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 flex-column luxury-loading">
                <div className="luxury-spinner" role="status"></div>
                <h3 className="mt-4 text-gold-shimmer">ĐANG ĐỒNG BỘ GIÁ VÀNG TRỰC TIẾP...</h3>
            </div>
        );
    }

    return (
        <section className='container-fluid h-100 p-0 position-relative d-flex flex-column'>
            {/* Offline Alert Badge (only visible when offline) */}
            {!isOnline && (
                <div className="offline-banner">
                    ⚠️ MẤT KẾT NỐI INTERNET - ĐANG HIỂN THỊ DỮ LIỆU ĐÃ LƯU
                </div>
            )}

            <div className='glass-board-panel d-flex flex-column h-100'>
                <table className="table align-middle mb-0 custom-table h-100">
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
