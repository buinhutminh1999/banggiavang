import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { NumericFormat } from 'react-number-format';

function PriceRow({ item, value, editMode, cheDoEdit, handleValueChange, index }) {

    // Helper to format display value
    const formatDisplay = (val) => {
        if (!val) return '0';
        return val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <motion.tr
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
        >
            <td className='fw-bold' style={{ width: '30%' }}>{item.nameFirstTD}</td>
            {item.listContent.map((item2, index2) => {
                return <td key={index2}>
                    <motion.div
                        key={value[item2.nameInput]} // Trigger animation on change
                        initial={{ scale: 1.5, color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.8)' }}
                        animate={{ scale: 1, color: 'var(--accent-color)', textShadow: '0 4px 8px rgba(0,0,0,0.6)' }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <span className='boujee-text' style={{ cursor: 'default' }}>
                            {formatDisplay(value[item2.nameInput])}
                        </span>
                    </motion.div>
                </td>
            })}
        </motion.tr>
    )
}

export default memo(PriceRow);
