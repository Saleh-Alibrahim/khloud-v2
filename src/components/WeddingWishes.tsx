import { useEffect, useRef, useState } from 'react';

const WeddingWishes = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const startMusic = async () => {
    if (audioRef.current && !musicPlaying) {
      try {
        // Set volume
        audioRef.current.volume = 0.5;
        // Reset to beginning
        audioRef.current.currentTime = 0;
        // Play the audio
        await audioRef.current.play();
        setMusicPlaying(true);
        setShowPlayOverlay(false);
      } catch (error) {
        console.log('Playback failed:', error);
      }
    }
  };

  const stopMusic = () => {
    if (audioRef.current && musicPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setMusicPlaying(false);
      setShowPlayOverlay(true);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startMusic();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'khloud' || password === 'خلود') {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPassword('');
    }
  };

  useEffect(() => {
    // Try autoplay on desktop
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isIOS && !isMobile) {
      const timer = setTimeout(() => {
        startMusic();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const arabicText = `خلود حبيبتي، أدري إن كلامي جرحك وما راح أسامح نفسي بدون ماتسامحيني.

كلمتي الي قلت  لك ندمان على كل حرف فيها وما تمثلني فيها... كانت لحظة عصبية غبية وكلام ما يمثل اللي بقلبي.

الحقيقة إني أحبك أكثر من أي شي بهالدنيا، وكلامي القاسي كان أكبر غلط بحياتي.

هالورد يشيل اعتذاري وندمي، وكل وردة تقول: أحبك، أحتاجك، وأبيك بحياتي.

 سامحيني وعطيني فرصة أعوضك عن كل الألم، إنتِ نور عيني وحبيبة روحي 🌹`;

  // Show password screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="celebration-bg min-h-screen flex items-center justify-center p-4">
        <div className="wedding-card max-w-md w-full relative z-10 animate-in fade-in-0 zoom-in-95 duration-1000">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-8">
              رسالة خاصة
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              هذه الرسالة محمية بكلمة سر
            </p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة السر..."
                className="w-full px-4 py-3 rounded-lg border border-rose-gold/30 bg-white/80 backdrop-blur-sm text-center text-lg focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 text-sm animate-in fade-in-0 duration-300">
                  كلمة السر غير صحيحة، حاول مرة أخرى
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                دخول
              </button>
            </form>
            <p className="text-sm text-foreground/60 mt-6">
              💐 مع الورد والحب 💐
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="celebration-bg relative flex items-center justify-center p-2 sm:p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 text-3xl sm:text-6xl text-rose-gold/30 float-animation">💖</div>
        <div className="absolute top-20 sm:top-32 right-5 sm:right-20 text-2xl sm:text-4xl text-blush-pink/40 float-animation" style={{ animationDelay: '1s' }}>🌸</div>
        <div className="absolute bottom-20 sm:bottom-32 left-5 sm:left-20 text-3xl sm:text-5xl text-champagne/30 float-animation" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 text-2xl sm:text-3xl text-accent/40 float-animation" style={{ animationDelay: '3s' }}>💐</div>
        <div className="absolute top-1/2 left-2 sm:left-5 text-2xl sm:text-4xl text-rose-gold/25 float-animation" style={{ animationDelay: '4s' }}>👑</div>
        <div className="absolute top-1/4 right-2 sm:right-5 text-3xl sm:text-5xl text-primary/30 float-animation" style={{ animationDelay: '1.5s' }}>💍</div>

        {/* Additional sparkles */}
        <div className="absolute top-40 left-1/4 text-2xl text-secondary/50 sparkle">✨</div>
        <div className="absolute bottom-40 right-1/3 text-3xl text-accent/40 sparkle" style={{ animationDelay: '2.5s' }}>⭐</div>
        <div className="absolute top-2/3 left-1/3 text-2xl text-rose-gold/40 sparkle" style={{ animationDelay: '1.8s' }}>💫</div>
      </div>

      {/* Main content card */}
      <div className="wedding-card max-w-4xl w-full relative z-10 animate-in fade-in-0 zoom-in-95 duration-1000 mx-2">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold glow-text text-primary mb-2 sm:mb-4 float-animation">
            🌹 حبيبتي خلود 🌹
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-gold to-primary mx-auto rounded-full"></div>
        </div>

        <div className="arabic-text text-center space-y-3 sm:space-y-6 text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90">
          {arabicText.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className={`animate-in slide-in-from-bottom-4 fade-in-0 duration-1000 ${paragraph.includes('❤️') ? 'text-lg sm:text-xl md:text-2xl font-semibold text-primary glow-text' : ''
                }`}
              style={{ animationDelay: `${(index + 1) * 300}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Decorative bottom */}
        <div className="flex justify-center items-center mt-6 sm:mt-12 space-x-4 rtl:space-x-reverse">
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-rose-gold"></div>
          <div className="text-2xl sm:text-4xl text-primary animate-pulse">💕</div>
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-rose-gold"></div>
        </div>
      </div>

      {/* Play overlay for mobile */}
      {showPlayOverlay && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-in fade-in-0 duration-500">
          <button
            onClick={handlePlayClick}
            className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-2xl hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-6xl animate-pulse">🎵</div>
              <p className="text-lg font-semibold text-primary">خلود اضغطي هنا</p>
            </div>
          </button>
        </div>
      )}

      {/* Music control button */}
      {musicPlaying && (
        <button
          onClick={stopMusic}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-primary/80 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-primary transition-all duration-300"
          title="إيقاف الموسيقى"
        >
          🎶
        </button>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
      >
        {/* Local wedding song - ولا أحلى من الدنيا */}
        <source src="/song.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default WeddingWishes;