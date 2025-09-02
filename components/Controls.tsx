import React from 'react';
import type { Theme } from '../types';
import { MaximizeIcon, MinimizeIcon, MusicIcon, NextTrackIcon, PauseIcon } from './Icons';

interface ControlsProps {
    is24Hour: boolean;
    isPlaying: boolean;
    isMaximize: boolean;
    theme: Theme;
    onToggle24Hour: () => void;
    onThemeChange: () => void;
    onFontChange: () => void;
    onMusicToggle: () => void;
    onTrackChange: () => void;
    onMaximizeToggle: () => void;
}

const ControlButton: React.FC<{
    onClick: () => void;
    style: React.CSSProperties;
    ariaLabel: string;
    children: React.ReactNode;
}> = ({ onClick, style, ariaLabel, children }) => (
    <button
        onClick={onClick}
        className="text-xs sm:text-sm font-semibold py-1 px-3 rounded-full border hover:bg-gray-700/50 transition-all focus:outline-none focus:ring-2 flex items-center justify-center"
        style={style}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);


const Controls: React.FC<ControlsProps> = ({
    is24Hour,
    isPlaying,
    isMaximize,
    theme,
    onToggle24Hour,
    onThemeChange,
    onFontChange,
    onMusicToggle,
    onTrackChange,
    onMaximizeToggle,
}) => {
    const buttonStyle = {
        backgroundColor: theme.buttonBg,
        color: theme.buttonColor,
        borderColor: theme.buttonBorder,
        '--tw-ring-color': theme.textColor,
    } as React.CSSProperties;

    return (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex flex-wrap gap-2 justify-end">
            <ControlButton onClick={onToggle24Hour} style={buttonStyle} ariaLabel={`Switch to ${is24Hour ? '12-hour' : '24-hour'} format`}>
                {is24Hour ? '12H' : '24H'}
            </ControlButton>
            <ControlButton onClick={onThemeChange} style={buttonStyle} ariaLabel="Change theme">
                Theme
            </ControlButton>
            <ControlButton onClick={onFontChange} style={buttonStyle} ariaLabel="Change font">
                Font
            </ControlButton>
            <ControlButton onClick={onMusicToggle} style={buttonStyle} ariaLabel={isPlaying ? 'Pause music' : 'Play music'}>
                {isPlaying ? <PauseIcon /> : <MusicIcon />}
            </ControlButton>
            <ControlButton onClick={onTrackChange} style={buttonStyle} ariaLabel="Switch channel">
                <NextTrackIcon />
            </ControlButton>
            <ControlButton onClick={onMaximizeToggle} style={buttonStyle} ariaLabel={isMaximize ? 'Minimize' : 'Maximize'}>
                {isMaximize ? <MinimizeIcon /> : <MaximizeIcon />}
            </ControlButton>
        </div>
    );
};

export default Controls;
