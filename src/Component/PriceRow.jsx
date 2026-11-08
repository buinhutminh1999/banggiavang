import React, { memo } from 'react';
import { motion } from 'framer-motion';

function GoldIcon({ code }) {
    if (code === '999') {
        // 24K Gold Bullion Ingot SVG
        return (
            <svg className="gold-row-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 34L12 16H36L42 34H6Z" fill="url(#ingotGrad999)" stroke="#FFF8DC" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 16L16 28H32L36 16" stroke="#FFE082" strokeWidth="1" opacity="0.7" />
                <path d="M6 34L16 28M42 34L32 28" stroke="#FFE082" strokeWidth="1" opacity="0.7" />
                <text x="24" y="25.5" textAnchor="middle" fill="#5D2900" fontSize="8.5" fontWeight="900" fontFamily="Montserrat, sans-serif">999</text>
                <defs>
                    <linearGradient id="ingotGrad999" x1="6" y1="16" x2="42" y2="34" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFDE7" />
                        <stop offset="40%" stopColor="#FFD700" />
                        <stop offset="80%" stopColor="#FFA000" />
                        <stop offset="100%" stopColor="#C66900" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
    if (code === '610') {
        // Royal Diamond & Gold Ring SVG
        return (
            <svg className="gold-row-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 14L24 8L30 14L24 22L18 14Z" fill="url(#gemGrad610)" stroke="#FFFDE7" strokeWidth="1.4" />
                <circle cx="24" cy="29" r="11" stroke="url(#ringGrad610)" strokeWidth="4.5" />
                <defs>
                    <linearGradient id="gemGrad610" x1="18" y1="8" x2="30" y2="22" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#FFE082" />
                        <stop offset="100%" stopColor="#FFB300" />
                    </linearGradient>
                    <linearGradient id="ringGrad610" x1="13" y1="18" x2="35" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFF8DC" />
                        <stop offset="45%" stopColor="#FFD54F" />
                        <stop offset="100%" stopColor="#E65100" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
    // 600 - Imperial Gold Crest Gem SVG
    return (
        <svg className="gold-row-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="24,8 38,18 33,38 15,38 10,18" fill="url(#gemGrad600)" stroke="#FFF8DC" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="24,13 33,20 29,33 19,33 15,20" fill="none" stroke="#FFFDE7" strokeWidth="1" opacity="0.65" />
            <defs>
                <linearGradient id="gemGrad600" x1="10" y1="8" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFF9C4" />
                    <stop offset="50%" stopColor="#FFC107" />
                    <stop offset="100%" stopColor="#D84315" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function PriceRow({ item, value, index }) {

    // Helper to format display value with thousand dots
    const formatDisplay = (val) => {
        if (!val || val === '0') return '---';
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <motion.tr
            className={`luxury-price-row row-tier-${item.code || index}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
        >
            {/* Column 1: Gold Type */}
            <td className='td-gold-col' style={{ width: '32%' }}>
                <div className='gold-type-card'>
                    <div className={`gold-emblem-box badge-${item.code || '999'}`}>
                        <GoldIcon code={item.code} />
                    </div>
                    <span className='gold-title'>{item.nameFirstTD}</span>
                </div>
            </td>

            {/* Column 2: BÁN RA & Column 3: MUA VÀO */}
            {item.listContent.map((item2, index2) => {
                const isSell = item2.type === 'sell';
                const priceValue = value[item2.nameInput];

                return (
                    <td key={index2} className={`td-price-cell ${isSell ? 'cell-sell' : 'cell-buy'}`} style={{ width: '34%' }}>
                        <div className={`price-card-pod ${isSell ? 'pod-sell' : 'pod-buy'}`}>
                            <motion.div
                                key={`${item2.nameInput}-${priceValue}`}
                                initial={{ scale: 1.14, filter: 'brightness(1.85)' }}
                                animate={{ scale: 1, filter: 'brightness(1)' }}
                                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                                className="price-value-motion-wrap"
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
