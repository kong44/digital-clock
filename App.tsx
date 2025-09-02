import React, { useState, useEffect, useRef } from 'react';
import { themes, fonts, musicTracks } from './constants';
import TimeDisplay from './components/TimeDisplay';
import DateDisplay from './components/DateDisplay';
import Controls from './components/Controls';
import type { MusicTrack } from './types';

const App: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const [is24Hour, setIs24Hour] = useState(false);
    const [themeIndex, setThemeIndex] = useState(0);
    const [fontIndex, setFontIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMaximize, setIsMaximize] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<MusicTrack>(() => musicTracks[Math.floor(Math.random() * musicTracks.length)]);
    
    const audioRef = useRef<HTMLAudioElement>(null);
    const mainRef = useRef<HTMLElement>(null);

    const currentTheme = themes[themeIndex];
    const currentFont = fonts[fontIndex];
    
    useEffect(() => {
        document.body.style.backgroundColor = currentTheme.background;
        document.body.style.transition = 'background-color 0.5s ease';
    }, [currentTheme]);

    useEffect(() => {
        const timerId = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.src !== currentTrack.url) {
            audio.src = currentTrack.url;
            audio.load();
        }

        if (isPlaying) {
            audio.play().catch(error => {
                if (error.name !== 'AbortError') {
                    console.error("Audio playback failed:", error);
                    setIsPlaying(false);
                }
            });
        } else {
            audio.pause();
        }
    }, [currentTrack, isPlaying]);

    useEffect(() => {
        const onFullscreenChange = () => setIsMaximize(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    const handleNextTheme = () => setThemeIndex((prev) => (prev + 1) % themes.length);
    const handleNextFont = () => setFontIndex((prev) => (prev + 1) % fonts.length);
    const handleToggleMusic = () => setIsPlaying(prev => !prev);

    const handleNextTrack = () => {
        let newTrack;
        do {
            newTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
        } while (musicTracks.length > 1 && newTrack.url === currentTrack.url);
        setCurrentTrack(newTrack);
    };
    
    const handleToggleMaximize = () => {
      const element = mainRef.current;
      if (!element) return;

      if (!document.fullscreenElement) {
        element.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fullDate = date.toLocaleDateString(undefined, dateOptions);

    return (
      <main
        ref={mainRef}
        className="min-h-screen flex flex-col items-center justify-center p-4 select-none antialiased"
        style={{ fontFamily: currentFont.styleName }}
      >
        <div
          className="relative backdrop-blur-sm p-20 md:p-16 rounded-2xl shadow-2xl border w-full max-w-5xl transition-colors duration-500"
          style={{
            backgroundColor: currentTheme.clockBackground,
            borderColor: currentTheme.borderColor,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none"></div>

          <Controls
            is24Hour={is24Hour}
            isPlaying={isPlaying}
            isMaximize={isMaximize}
            theme={currentTheme}
            onToggle24Hour={() => setIs24Hour(p => !p)}
            onThemeChange={handleNextTheme}
            onFontChange={handleNextFont}
            onMusicToggle={handleToggleMusic}
            onTrackChange={handleNextTrack}
            onMaximizeToggle={handleToggleMaximize}
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <TimeDisplay
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              ampm={ampm}
              theme={currentTheme}
            />
            <DateDisplay fullDate={fullDate} theme={currentTheme} />
          </div>

          <div className="text-center text-xs mt-4 tracking-widest uppercase truncate px-4" style={{ color: currentTheme.dateColor, opacity: 0.7 }}>
            {currentTheme.name} / {currentFont.name}
          </div>
          <div className="text-center text-xs mt-1 tracking-widest uppercase truncate px-4" style={{ color: currentTheme.dateColor, opacity: 0.7 }} title={currentTrack.title}>
            {currentTrack.title}
          </div>
        </div>

        <footer className="absolute bottom-4 text-center text-gray-400 text-sm transition-opacity hover:opacity-100 opacity-50">
          <p>Classic Digital Clock</p>
        </footer>

        <audio ref={audioRef} onEnded={handleNextTrack} crossOrigin="anonymous"/>
      </main>
    );
};

export default App;
