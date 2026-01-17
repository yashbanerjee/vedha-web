import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassSurfaceProps extends MotionProps {
    children: ReactNode;
    className?: string;
    intensity?: 'light' | 'medium' | 'strong';
}

const GlassSurface = ({
    children,
    className = '',
    intensity = 'medium',
    ...motionProps
}: GlassSurfaceProps) => {
    const intensityStyles = {
        light: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        medium: {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
        },
        strong: {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(24px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        },
    };

    const style = intensityStyles[intensity];

    return (
        <motion.div
            className={`glass-surface ${className}`}
            style={{
                backgroundColor: style.backgroundColor,
                backdropFilter: style.backdropFilter,
                WebkitBackdropFilter: style.backdropFilter,
                border: style.border,
                borderRadius: '24px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                position: 'relative',
                overflow: 'hidden',
                ...motionProps.style,
            }}
            {...motionProps}
        >
            {/* Gradient overlay for depth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
                    borderRadius: '24px',
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassSurface;
