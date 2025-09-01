import React, { useState, useEffect, useRef } from 'react';

// --- Theme Definitions ---
const themes = [
    {
        name: 'Classic Cyan',
        background: '#000000',
        clockBackground: 'rgba(17, 24, 39, 0.7)',
        borderColor: '#374151',
        textColor: '#67e8f9',
        colonColor: '#22d3ee',
        dateColor: '#0891b2',
        buttonBg: 'rgba(55, 65, 81, 0.5)',
        buttonColor: '#22d3ee',
        buttonBorder: '#4b5563',
    },
    {
        name: 'Vintage Amber',
        background: '#1c1917',
        clockBackground: 'rgba(28, 25, 23, 0.7)',
        borderColor: '#57534e',
        textColor: '#fcd34d',
        colonColor: '#fbbf24',
        dateColor: '#f59e0b',
        buttonBg: 'rgba(41, 37, 36, 0.5)',
        buttonColor: '#fbbf24',
        buttonBorder: '#57534e',
    },
    {
        name: 'Matrix Green',
        background: '#000000',
        clockBackground: 'rgba(10, 20, 10, 0.7)',
        borderColor: '#166534',
        textColor: '#4ade80',
        colonColor: '#22c55e',
        dateColor: '#16a34a',
        buttonBg: 'rgba(22, 101, 52, 0.5)',
        buttonColor: '#4ade80',
        buttonBorder: '#166534',
    },
    {
        name: 'Ruby Red',
        background: '#1e0000',
        clockBackground: 'rgba(30, 0, 0, 0.7)',
        borderColor: '#991b1b',
        textColor: '#f87171',
        colonColor: '#ef4444',
        dateColor: '#dc2626',
        buttonBg: 'rgba(127, 29, 29, 0.5)',
        buttonColor: '#f87171',
        buttonBorder: '#991b1b',
    },
    {
        name: 'Plasma Purple',
        background: '#1e0b2a',
        clockBackground: 'rgba(30, 11, 42, 0.7)',
        borderColor: '#6b21a8',
        textColor: '#d8b4fe',
        colonColor: '#c084fc',
        dateColor: '#a855f7',
        buttonBg: 'rgba(91, 33, 182, 0.5)',
        buttonColor: '#d8b4fe',
        buttonBorder: '#6b21a8',
    },
    {
        name: 'Arctic Blue',
        background: '#0c1425',
        clockBackground: 'rgba(12, 20, 37, 0.7)',
        borderColor: '#1e3a8a',
        textColor: '#dbeafe',
        colonColor: '#93c5fd',
        dateColor: '#60a5fa',
        buttonBg: 'rgba(30, 58, 138, 0.5)',
        buttonColor: '#dbeafe',
        buttonBorder: '#1e3a8a',
    },
    {
        name: 'Sunset Orange',
        background: '#2c1302',
        clockBackground: 'rgba(44, 19, 2, 0.7)',
        borderColor: '#9a3412',
        textColor: '#fdba74',
        colonColor: '#fb923c',
        dateColor: '#f97316',
        buttonBg: 'rgba(124, 45, 18, 0.5)',
        buttonColor: '#fdba74',
        buttonBorder: '#9a3412',
    },
    {
        name: 'Emerald Forest',
        background: '#061d10',
        clockBackground: 'rgba(6, 29, 16, 0.7)',
        borderColor: '#065f46',
        textColor: '#6ee7b7',
        colonColor: '#34d399',
        dateColor: '#10b981',
        buttonBg: 'rgba(5, 150, 105, 0.5)',
        buttonColor: '#6ee7b7',
        buttonBorder: '#065f46',
    },
    {
        name: 'Ghost White',
        background: '#4b5563',
        clockBackground: 'rgba(17, 24, 39, 0.7)',
        borderColor: '#9ca3af',
        textColor: '#f9fafb',
        colonColor: '#e5e7eb',
        dateColor: '#d1d5db',
        buttonBg: 'rgba(55, 65, 81, 0.5)',
        buttonColor: '#f9fafb',
        buttonBorder: '#9ca3af',
    },
    {
        name: 'Hot Pink',
        background: '#2c021a',
        clockBackground: 'rgba(44, 2, 26, 0.7)',
        borderColor: '#9d174d',
        textColor: '#f9a8d4',
        colonColor: '#f472b6',
        dateColor: '#ec4899',
        buttonBg: 'rgba(131, 24, 67, 0.5)',
        buttonColor: '#f9a8d4',
        buttonBorder: '#9d174d',
    },
];

// --- Font Definitions ---
const fonts = [
    { name: 'Bungee', className: 'font-bungee' },
    { name: 'Audiowide', className: 'font-audiowide' },
    { name: 'Viga', className: 'font-viga' },
    { name: 'Concert One', className: 'font-concert-one' },
    { name: 'Bitcount', className: 'font-bitcount' },
];

// --- Music Definitions ---
const musicTracks = [
     {  
        'title': 'Music To Relax',
        'url': 'https://music-to-relax.stream.laut.fm/music-to-relax', // Relaxing
     },
     {
        'title':'Radio Relax International',
        'url':'https://radio.tvstitch.com/RadioRelax_Int'
     },
     {
        'title':'EPIC CLASSICAL - Classical Restaurant Music',
        'url': 'https://stream.epic-classical.com/classical-restaurant-music'
     },
     {
        'title': 'EPIC CLASSICAL - Classical Relax',
        'url': 'https://stream.epic-classical.com/classical-relax'
     },
     {
        'title': 'Beautiful Music 101',
        'url': 'https://radio.streemlion.com:1665/stream'
     },
     {
        'title': 'Soundstorm - Relax Radio',
        'url': 'http://stream.soundstorm-radio.com/radio/8000/radio.mp3'
     },
     {  
        'title': 'VOA English',
        'url': 'http://voa-28.akacast.akamaistream.net/7/54/322040/v1/ibb.akacast.akamaistream.net/voa-28.m3u'
     },
     {
        'title':'Podcast Radio',
        'url': 'https://podcastradio.cdnstream1.com/world'
     },
     {
        'title':'Podcast Radio Business',
        'url': 'https://ais-sa8.cdnstream1.com/2747_192.mp3'
     }
    
];

// --- Helper Components (Defined outside App to prevent re-creation on re-renders) ---

interface TimeDisplayProps {
    hours: string;
    minutes: string;
    seconds: string;
    ampm: string;
    theme: typeof themes[0];
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ hours, minutes, seconds, ampm, theme }) => (
    <div className="flex items-end justify-center font-bold">
        <span className="text-7xl sm:text-9xl tracking-widest" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
            {hours}
        </span>
        <span key={`colon1-${seconds}`} className="text-5xl sm:text-7xl animate-tick mx-2 sm:mx-3 pb-2" style={{ color: theme.colonColor }}>:</span>
        <span className="text-7xl sm:text-9xl tracking-widest" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
            {minutes}
        </span>
        <span key={`colon2-${seconds}`} className="text-5xl sm:text-7xl animate-tick mx-2 sm:mx-3 pb-2" style={{ color: theme.colonColor }}>:</span>
        <span className="text-7xl sm:text-9xl tracking-widest" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
            {seconds}
        </span>
        {ampm && (
            <span className="text-3xl sm:text-5xl ml-4 self-end pb-2" style={{ color: theme.textColor, filter: `drop-shadow(0 0 8px ${theme.textColor}80)` }}>
                {ampm}
            </span>
        )}
    </div>
);

interface DateDisplayProps {
    fullDate: string;
    theme: typeof themes[0];
}

const DateDisplay: React.FC<DateDisplayProps> = ({ fullDate, theme }) => (
    <div className="text-center text-lg sm:text-2xl mt-4 tracking-wider" style={{ color: theme.dateColor }}>
        {fullDate}
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const [is24Hour, setIs24Hour] = useState(true);
    const [themeIndex, setThemeIndex] = useState(0);
    const [fontIndex, setFontIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(() => musicTracks[Math.floor(Math.random() * musicTracks.length)]);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTheme = themes[themeIndex];
    const currentFont = fonts[fontIndex];

    useEffect(() => {
        document.body.style.backgroundColor = currentTheme.background;
        document.body.style.transition = 'background-color 0.5s ease';
        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.transition = '';
        }
    }, [currentTheme]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    // Centralized effect for managing audio playback
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Programmatically update src and load when track changes
        if (audio.src !== currentTrack.url) {
            audio.src = currentTrack.url;
            audio.load();
        }

        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Ignore AbortError which can happen on rapid track changes
                    if (error.name !== 'AbortError') {
                        console.error("Audio playback failed:", error);
                        setIsPlaying(false); // Sync UI if playback fails
                    }
                });
            }
        } else {
            audio.pause();
        }
    }, [currentTrack, isPlaying]);

    const handleThemeChange = () => {
        setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    };

    const handleFontChange = () => {
        setFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
    };
    
    const handleMusicToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTrackEnd = () => {
        let newTrack;
        do {
            newTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
        } while (musicTracks.length > 1 && newTrack === currentTrack);
        setCurrentTrack(newTrack);
    };

    const hoursRaw = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    let hours: string;
    let ampm = '';

    if (is24Hour) {
        hours = String(hoursRaw).padStart(2, '0');
    } else {
        ampm = hoursRaw >= 12 ? 'PM' : 'AM';
        hours = String(hoursRaw % 12 || 12).padStart(2, '0');
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const fullDate = date.toLocaleDateString('en-US', dateOptions);
    
    const buttonStyle = {
        backgroundColor: currentTheme.buttonBg,
        color: currentTheme.buttonColor,
        borderColor: currentTheme.buttonBorder,
        '--tw-ring-color': currentTheme.textColor,
    };

    return (
        <main className={`min-h-screen flex flex-col items-center justify-center p-4 select-none antialiased ${currentFont.className}`}>
            <div 
                className="relative backdrop-blur-sm p-20 rounded-2xl shadow-2xl border w-full max-w-5xl transition-colors duration-500"
                style={{
                    backgroundColor: currentTheme.clockBackground,
                    borderColor: currentTheme.borderColor
                }}
            >
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none"></div>
                
                 <div className="absolute top-3 right-3 z-20 flex gap-2">
                    <button
                        onClick={() => setIs24Hour(!is24Hour)}
                        className="text-xs sm:text-sm font-semibold py-1 px-3 rounded-full border hover:bg-gray-700/50 transition-all focus:outline-none focus:ring-2"
                        style={buttonStyle}
                        aria-label={`Switch to ${is24Hour ? '12-hour' : '24-hour'} format`}
                    >
                        {is24Hour ? '12H' : '24H'}
                    </button>
                    <button
                        onClick={handleThemeChange}
                        className="text-xs sm:text-sm font-semibold py-1 px-3 rounded-full border hover:bg-gray-700/50 transition-all focus:outline-none focus:ring-2"
                        style={buttonStyle}
                        aria-label="Change theme"
                    >
                        Theme
                    </button>
                    <button
                        onClick={handleFontChange}
                        className="text-xs sm:text-sm font-semibold py-1 px-3 rounded-full border hover:bg-gray-700/50 transition-all focus:outline-none focus:ring-2"
                        style={buttonStyle}
                        aria-label="Change font"
                    >
                        Font
                    </button>
                    <button
                        onClick={handleMusicToggle}
                        className="text-xs sm:text-sm font-semibold py-1 px-3 rounded-full border hover:bg-gray-700/50 transition-all focus:outline-none focus:ring-2 flex items-center justify-center"
                        style={buttonStyle}
                        aria-label={isPlaying ? "Pause music" : "Play music"}
                    >
                       {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
                            </svg>
                       ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" />
                            </svg>
                       )}
                    </button>
                    <button
                        onClick={handleTrackEnd}
                        className="text-xs sm:text-sm font-semibold py-1 px-3 rounded-full border hover:bg-gray-700/50 transition-all focus:outline-none focus:ring-2 flex items-center justify-center"
                        style={buttonStyle}
                        aria-label="switch channel"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 3 21 3 21 8"></polyline>
                            <line x1="4" y1="20" x2="21" y2="3"></line>
                            <polyline points="16 17 21 17 21 22"></polyline>
                            <line x1="4" y1="4" x2="11" y2="11"></line>
                        </svg>
                    </button>
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} ampm={ampm} theme={currentTheme} />
                    <DateDisplay fullDate={fullDate} theme={currentTheme} />
                </div>
                <div className="text-center text-xs mt-4 tracking-widest uppercase" style={{ color: currentTheme.dateColor, opacity: 0.7 }}>
                    {currentTheme.name} / {currentFont.name}
                </div>
                <div className="text-center text-xs mt-4 tracking-widest uppercase" style={{ color: currentTheme.dateColor, opacity: 0.7 }}>
                    {currentTrack.title}
                </div>
            </div>
            
            <footer className="absolute bottom-4 text-center text-gray-600 text-sm transition-opacity hover:opacity-100 opacity-50">
                <p>Classic Digital Clock</p>
            </footer>

            <audio 
                ref={audioRef} 
                onEnded={handleTrackEnd}
            />
        </main>
    );
};

export default App;
