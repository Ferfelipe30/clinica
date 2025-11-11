import React from 'react';

type Props = {
    name?: string;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
};

export default function AvatarInitial({ name, size = 48, className, style }: Props) {
    const initial = (name || '').trim().charAt(0).toUpperCase() || '?';
    const styleObj: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: Math.round(size * 0.45),
        userSelect: 'none',
        ...style,
    };
    return <div className={className} style={styleObj}>{initial}</div>;
}