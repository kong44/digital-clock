import React from 'react';
import type { Theme } from '../types';

interface TimeDisplayProps {
    hours: string;
    minutes: string;
    seconds: string;
    ampm: string;
    theme: Theme;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ hours, minutes, seconds, ampm, theme }) => (
    <div className="flex items-end justify-center font-bold">
        <span className="text-6xl sm:text-7xl md:text-9xl tracking-widest" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
            {hours}
        </span>
        <span key={`colon1-${seconds}`} className="text-4xl sm:text-5xl md:text-7xl animate-tick mx-1 sm:mx-2 md:mx-3 pb-1 md:pb-2" style={{ color: theme.colonColor }}>:</span>
        <span className="text-6xl sm:text-7xl md:text-9xl tracking-widest" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
            {minutes}
        </span>
        <span key={`colon2-${seconds}`} className="text-4xl sm:text-5xl md:text-7xl animate-tick mx-1 sm:mx-2 md:mx-3 pb-1 md:pb-2" style={{ color: theme.colonColor }}>:</span>
        <span className="text-6xl sm:text-7xl md:text-9xl tracking-widest" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
            {seconds}
        </span>
        {ampm && (
            <span className="text-2xl sm:text-3xl md:text-5xl ml-2 sm:ml-4 self-end pb-1 md:pb-2" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
                {ampm}
            </span>
        )}
    </div>
);

export default TimeDisplay;
