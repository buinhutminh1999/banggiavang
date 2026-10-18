import React, { memo } from 'react';
import { motion } from 'framer-motion';

function PriceRow({ item, value, editMode, cheDoEdit, handleValueChange, index }) {

    // Helper to format display value
    const formatDisplay = (val) => {
        if (!val || val === '0') return '---';
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <motion.tr
            className='luxury-price-row'
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.12, duration: 0.45, ease: "easeOut" }}
        >
            {/* Column 1: Gold Type */}
            <td className='td-gold-col text-center' style={{ width: '30%' }}>
                <span className='gold-title'>{item.nameFirstTD}</span>
            </td>

            {/* Column 2: BÁN RA & Column 3: MUA VÀO */}
            {item.listContent.map((item2, index2) => {
                const isSell = item2.type === 'sell';
                const priceValue = value[item2.nameInput];

                return (
                    <td key={index2} className={`td-price-cell ${isSell ? 'cell-sell' : 'cell-buy'}`} style={{ width: '35%' }}>
                        <div className={`price-card-pod ${isSell ? 'pod-sell' : 'pod-buy'}`}>
                            <motion.div
                                key={priceValue}
                                initial={{ scale: 1.18, filter: 'brightness(2)' }}
                                animate={{ scale: 1, filter: 'brightness(1)' }}
                                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                            >
                                <span className={`price-digits ${isSell ? 'digits-sell' : 'digits-buy'}`}>
                                    {formatDisplay(priceValue)}
                                </span>
                            </motion.div>
                        </div>
                    </td>
                );
            })}
        </motion.tr>
    )
}

export default memo(PriceRow);
