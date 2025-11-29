import { useState, useEffect } from 'react';

const RESET_PASSWORD = 'banked123';
const STORAGE_KEY = 'banked_timer_start';

function FlipDigit({ digit }) {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);
  const baseDigitStyle = {
    position: 'absolute',
    inset: 0,
    color: '#00ff88',
    textShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
    lineHeight: 1,
    fontSize: 'clamp(3.6rem, 11.5vw, 6.4rem)',
    fontWeight: 700,
    fontFamily: "'Courier New', monospace",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const topDigitStyle = {
    ...baseDigitStyle,
    clipPath: 'inset(0 0 50% 0)',
    transform: 'translateY(50%)'
  };
  const bottomDigitStyle = {
    ...baseDigitStyle,
    clipPath: 'inset(50% 0 0 0)',
    transform: 'translateY(-50%)'
  };

  useEffect(() => {
    if (digit !== currentDigit) {
      setIsFlipping(true);
      const timeout = setTimeout(() => {
        setCurrentDigit(digit);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [digit, currentDigit]);

  return (
    <div style={{
      perspective: '1000px',
      display: 'inline-block'
    }}>
      <div style={{
        position: 'relative',
        width: 'clamp(60px, 11vw, 110px)',
        height: 'clamp(90px, 18vw, 170px)',
        fontWeight: 700,
        fontFamily: "'Courier New', monospace"
      }}>
        {/* Top flap - shows top half of current digit */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #2a2a3e 0%, #1f1f2e 100%)',
          border: '2px solid #00ff88',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          top: 0,
          borderRadius: '8px 8px 0 0',
          borderBottom: '1px solid rgba(0, 255, 136, 0.3)',
          transform: isFlipping ? 'rotateX(-90deg)' : 'rotateX(0deg)',
          transformOrigin: 'bottom',
          transition: 'transform 0.3s ease-in-out'
        }}>
          <div style={topDigitStyle}>{currentDigit}</div>
        </div>
        
        {/* Bottom flap - shows bottom half of current digit */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #1f1f2e 0%, #15152e 100%)',
          border: '2px solid #00ff88',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          bottom: 0,
          borderRadius: '0 0 8px 8px',
          borderTop: '1px solid rgba(0, 0, 0, 0.5)',
          opacity: isFlipping ? 0 : 1,
          transition: 'opacity 0.15s ease-in-out'
        }}>
          <div style={bottomDigitStyle}>{currentDigit}</div>
        </div>
        
        {/* Flipping bottom flap - shows bottom half of new digit */}
        {isFlipping && (
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #1f1f2e 0%, #15152e 100%)',
            border: '2px solid #00ff88',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            bottom: 0,
            borderRadius: '0 0 8px 8px',
            borderTop: '1px solid rgba(0, 0, 0, 0.5)',
            transform: 'rotateX(90deg)',
            transformOrigin: 'top',
            animation: 'flipBottom 0.3s ease-in-out 0.15s forwards',
            zIndex: 1
          }}>
            <div style={bottomDigitStyle}>{digit}</div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes flipBottom {
          0% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const getInitialTimestamp = () => {
    return '2025-11-01T12:00:00Z';
  };

  const [startTimestamp, setStartTimestamp] = useState(getInitialTimestamp);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeDifference = () => {
    const start = new Date(startTimestamp).getTime();
    const diff = currentTime - start;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return {
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds)
    };
  };

  const formatNumber = (num, digits) => {
    return String(num).padStart(digits, '0').split('');
  };

  const handleReset = () => {
    if (password === RESET_PASSWORD) {
      const now = new Date().toISOString();
      setStartTimestamp(now);
      setPassword('');
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const time = calculateTimeDifference();
  const daysDigits = formatNumber(time.days, 3);
  const hoursDigits = formatNumber(time.hours, 2);
  const minutesDigits = formatNumber(time.minutes, 2);
  const secondsDigits = formatNumber(time.seconds, 2);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '1200px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          fontWeight: 800,
          color: '#00ff88',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '3rem',
          textShadow: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
          animation: 'glow 2s ease-in-out infinite alternate'
        }}>
          DAYS SINCE GETTING #BANKED
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
          {/* Row 1: Days */}
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {daysDigits.map((digit, index) => (
                  <FlipDigit key={`day-${index}`} digit={digit} />
                ))}
              </div>
              <div style={{
                fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                color: '#00ff88',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>DAYS</div>
            </div>
          </div>

          {/* Row 2: Hours, Minutes, Seconds */}
          <div style={{
            display: 'flex',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {hoursDigits.map((digit, index) => (
                  <FlipDigit key={`hour-${index}`} digit={digit} />
                ))}
              </div>
              <div style={{
                fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                color: '#00ff88',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>HOURS</div>
            </div>

            <div style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              color: '#00ff88',
              fontWeight: 700,
              alignSelf: 'center',
              marginTop: '-1.5rem',
              opacity: 0.7
            }}>:</div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {minutesDigits.map((digit, index) => (
                  <FlipDigit key={`min-${index}`} digit={digit} />
                ))}
              </div>
              <div style={{
                fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                color: '#00ff88',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>MINUTES</div>
            </div>

            <div style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              color: '#00ff88',
              fontWeight: 700,
              alignSelf: 'center',
              marginTop: '-1.5rem',
              opacity: 0.7
            }}>:</div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {secondsDigits.map((digit, index) => (
                  <FlipDigit key={`sec-${index}`} digit={digit} />
                ))}
              </div>
              <div style={{
                fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                color: '#00ff88',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>SECONDS</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleReset()}
              style={{
                padding: '0.875rem 1.5rem',
                fontSize: '1rem',
                border: `2px solid ${showError ? '#ff4444' : '#00ff88'}`,
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                animation: showError ? 'shake 0.5s ease-in-out' : 'none'
              }}
            />
            <button 
              onClick={handleReset}
              disabled={!password}
              style={{
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                background: password ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)' : '#555',
                color: '#1a1a2e',
                border: 'none',
                borderRadius: '8px',
                cursor: password ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: password ? '0 4px 15px rgba(0, 255, 136, 0.3)' : 'none',
                opacity: password ? 1 : 0.5
              }}
            >
              Reset Counter
            </button>
          </div>
          {showError && (
            <div style={{
              color: '#ff4444',
              fontSize: '0.875rem',
              marginTop: '1rem',
              fontWeight: 600
            }}>
              Incorrect password
            </div>
          )}
        </div>

        <style>{`
          @keyframes glow {
            from {
              text-shadow: 0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3);
            }
            to {
              text-shadow: 0 0 30px rgba(0, 255, 136, 0.7), 0 0 60px rgba(0, 255, 136, 0.5);
            }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
        `}</style>
      </div>
    </div>
  );
}
