import { useRef } from 'react';

export default function CustomButton({ 
    bgColor = '#7F42CE', 
    hoverColor = '#F95D08', 
    textColor = '#fff', 
    rounded = 'rounded-full',
    children,
    ...props
}) {
    const btnRef = useRef(null);

    const handleMouseEnter = () => {
        if (btnRef.current) btnRef.current.style.backgroundColor = hoverColor;
    };

    const handleMouseLeave = () => {
        if (btnRef.current) btnRef.current.style.backgroundColor = bgColor;
    };

    return (
        <button
            type="button"
            ref={btnRef}
            className={`focus:ring-4 ${rounded} font-medium text-sm px-5 py-2.5 me-2 mb-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg`}
            style={{
                backgroundColor: bgColor,
                color: textColor
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </button>
    );
}