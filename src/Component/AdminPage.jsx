import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NumericFormat } from 'react-number-format';
import { useDebounce } from 'react-use';
import './style.css';

const PIN_CODE = '1234';
const PIN_STORAGE_KEY = 'admin_pin_verified';

const listNull = {
    giaBan9999: '0',
    giaMua9999: '0',
    giaBan610: '0',
    giaMua610: '0',
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Initial check
    const [pin, setPin] = useState('');
    const [prices, setPrices] = useState(listNull);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Check localStorage for saved PIN on mount
    useEffect(() => {
        const savedPin = localStorage.getItem(PIN_STORAGE_KEY);
        if (savedPin === PIN_CODE) {
            setAuthenticated(true);
        }
        setIsCheckingAuth(false); // Done checking
    }, []);

    useEffect(() => {
        const loadPrices = async () => {
            const pricesDoc = doc(db, 'settings', 'prices');
            const docSnap = await getDoc(pricesDoc);
            if (docSnap.exists()) {
                setPrices(docSnap.data());
            }
            setIsLoaded(true);
        };
        if (authenticated) {
            loadPrices();
        }
    }, [authenticated]);

    useDebounce(
        async () => {
            if (!authenticated || !isLoaded) return;

            setSaving(true);
            setMessage('⏳ Đang lưu...');
            try {
                const pricesDoc = doc(db, 'settings', 'prices');
                await setDoc(pricesDoc, prices);
                const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setMessage(`✓ Đã lưu lúc ${time}`);
                // Timer removed to keep the 'Last Saved' message visible
                // setTimeout(() => setMessage(''), 2000);
            } catch (error) {
                setMessage('❌ Lỗi lưu!');
            }
            setSaving(false);
        },
        800,
        [prices]
    );

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin === PIN_CODE) {
            localStorage.setItem(PIN_STORAGE_KEY, pin); // Remember PIN
            setAuthenticated(true);
        } else {
            setMessage('Sai mã PIN!');
            setTimeout(() => setMessage(''), 2000);
        }
    };

    const handlePriceChange = (name, values) => {
        setPrices({ ...prices, [name]: values.value });
    };

    // Show nothing while checking auth (prevents flash)
    if (isCheckingAuth) {
        return (
            <div className="admin-container">
                <div style={{ color: '#666', fontSize: '18px' }}>Đang tải...</div>
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="admin-container">
                <div className="admin-card">
                    <h2>🔐 Nhập Mã PIN</h2>
                    <form onSubmit={handlePinSubmit}>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Mã PIN"
                            className="admin-input"
                            autoFocus
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                        <button type="submit" className="admin-btn">Đăng nhập</button>
                    </form>
                    {message && <p className="admin-message error">{message}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-card">
                <h2>💰 Cập Nhật Giá Vàng</h2>

                {/* Status Indicator */}
                <div style={{ textAlign: 'center', marginBottom: '20px', height: '24px' }}>
                    {saving ?
                        <span style={{ color: '#f57c00', fontWeight: 'bold' }}>⏳ Đang tự động lưu...</span> :
                        message && <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>{message}</span>
                    }
                </div>

                <div className="price-group">
                    <h3>VÀNG 9999</h3>
                    <div className="price-grid">
                        <div className="price-item sell">
                            <label>Bán ra</label>
                            <NumericFormat
                                value={prices.giaBan9999}
                                onValueChange={(values) => handlePriceChange('giaBan9999', values)}
                                thousandSeparator="."
                                decimalSeparator=","
                                className="admin-input"
                                inputMode="decimal"
                                pattern="[0-9]*"
                            />
                        </div>
                        <div className="price-item buy">
                            <label>Mua vào</label>
                            <NumericFormat
                                value={prices.giaMua9999}
                                onValueChange={(values) => handlePriceChange('giaMua9999', values)}
                                thousandSeparator="."
                                decimalSeparator=","
                                className="admin-input"
                                inputMode="decimal"
                                pattern="[0-9]*"
                            />
                        </div>
                    </div>
                </div>

                <div className="price-group">
                    <h3>VÀNG 610</h3>
                    <div className="price-grid">
                        <div className="price-item sell">
                            <label>Bán ra</label>
                            <NumericFormat
                                value={prices.giaBan610}
                                onValueChange={(values) => handlePriceChange('giaBan610', values)}
                                thousandSeparator="."
                                decimalSeparator=","
                                className="admin-input"
                                inputMode="decimal"
                                pattern="[0-9]*"
                            />
                        </div>
                        <div className="price-item buy">
                            <label>Mua vào</label>
                            <NumericFormat
                                value={prices.giaMua610}
                                onValueChange={(values) => handlePriceChange('giaMua610', values)}
                                thousandSeparator="."
                                decimalSeparator=","
                                className="admin-input"
                                inputMode="decimal"
                                pattern="[0-9]*"
                            />
                        </div>
                    </div>
                </div>

                <div className="price-group">
                    <h3>📢 CHẠY CHỮ QUẢNG CÁO</h3>
                    <textarea
                        value={prices.slogan || ''}
                        onChange={(e) => setPrices({ ...prices, slogan: e.target.value })}
                        placeholder="Nhập nội dung chạy chữ dưới chân màn hình..."
                        className="admin-input"
                        style={{ height: '80px', fontSize: '18px', textAlign: 'left', resize: 'none' }}
                        spellCheck="false"
                    />
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button
                        onClick={() => {
                            localStorage.removeItem(PIN_STORAGE_KEY);
                            setAuthenticated(false);
                            setPin('');
                        }}
                        style={{
                            background: '#757575',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        🔒 KHÓA MÀN HÌNH
                    </button>
                </div>
            </div>
        </div>
    );
}
