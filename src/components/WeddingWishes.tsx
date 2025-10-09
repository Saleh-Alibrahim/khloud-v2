import { useEffect, useRef, useState } from 'react';

const WeddingWishes = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<Set<number>>(new Set());
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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
    if (password.toLowerCase() === 'saleh2' || password === 'صالح2') {
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

  useEffect(() => {
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = paragraphRefs.current.indexOf(entry.target as HTMLParagraphElement);
            if (index !== -1 && !visibleParagraphs.has(index)) {
              // Staggered delay - each line appears 2 seconds after the previous one
              setTimeout(() => {
                setVisibleParagraphs((prev) => new Set(prev).add(index));
              }, index * 2000);
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    paragraphRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      paragraphRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isAuthenticated, visibleParagraphs]);

  const arabicText = `خلود حبيبتي، كل لحظة معك الآن هي كنز أحتفظ فيه بقلبي، لأني أعرف قيمة الوقت اللي عندنا.

أحبك اليوم أكثر من أمس، وأعيش كل يوم معك كأنه هدية ثمينة ما أبي أضيعها. وجودك بحياتي الآن هو أجمل شي حاصل لي.

نعم، أعرف إن الظروف قد تفرقنا يوماً ما، وإن طريقنا ما راح يكمل للأبد. بس هذا يخليني أقدر كل ثانية، كل ابتسامة، كل لمسة.

عيونك اللي أشوفها كل يوم، ضحكتك اللي تملأ قلبي فرح، صوتك اللي يطمني... كلها لحظات أخزنها بذاكرتي للأيام الجاية.

أحبك رغم معرفتي بالنهاية، أو ربما أحبك أكثر بسببها. لأن الحب الحقيقي ما يحتاج وعود بالأبدية عشان يكون صادق.

كل يوم أصحى فيه وإنتِ بحياتي، أشكر الله على هذه النعمة. وكل ليلة أنام وأنا أدعي إن الوقت يمشي بطيء.

أعرف إني ما راح أقدر أعطيك "للأبد" اللي تستحقينه، بس أقدر أعطيك كل حبي في "الآن" اللي عندنا.

سامحيني من الآن على الوداع اللي راح يجي، وعلى الدموع اللي ما راح أقدر أمسحها، وعلى المستقبل اللي ما راح نعيشه سوا.

بس اعرفي إن هذا الحب، حتى لو كان مؤقت بالأيام، راح يكون أبدي بقلبي. وإنتِ راح تكونين دائماً أصدق حب عرفته.

أحبك الآن، وراح أحبك بكرة، وراح أستمر أحبك حتى بعد ما تفرقنا الحياة. لأن بعض الناس يتركون أثر ما ينمحي 🌹`;

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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="celebration-bg relative min-h-screen overflow-y-auto">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
      <div className="wedding-card max-w-6xl w-full relative z-10 mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold glow-text text-primary mb-4 sm:mb-6 float-animation">
            🌹 حبيبتي خلود 🌹
          </h1>
          <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-rose-gold to-primary mx-auto rounded-full"></div>
        </div>

        <div className="arabic-text text-center space-y-6 sm:space-y-8 md:space-y-10 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 max-w-5xl mx-auto">
          {arabicText.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              ref={(el) => (paragraphRefs.current[index] = el)}
              className={`transition-all duration-[2500ms] ease-in-out transform ${
                visibleParagraphs.has(index)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-16 scale-90'
              } ${paragraph.includes('🌹') ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary glow-text' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Decorative bottom with more spacing */}
        <div className="flex justify-center items-center mt-12 sm:mt-16 space-x-4 rtl:space-x-reverse mb-8">
          <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent to-rose-gold"></div>
          <div className="text-3xl sm:text-5xl text-primary animate-pulse">💕</div>
          <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-l from-transparent to-rose-gold"></div>
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