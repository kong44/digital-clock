import React from 'react';
import type { Theme } from '../types';

interface DateDisplayProps {
    fullDate: string;
    theme: Theme;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ fullDate, theme }) => (
    <div className="text-center text-base sm:text-lg md:text-2xl mt-2 sm:mt-4 tracking-wider" style={{ color: theme.dateColor }}>
        {fullDate}
    </div>
);

export default DateDisplay;
