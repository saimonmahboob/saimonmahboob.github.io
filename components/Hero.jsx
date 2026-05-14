// Hero — editorial split layout, oversized serif headline + portrait card

const heroStyles = {
  wrap: {
    position: 'relative',
    paddingTop: 'clamp(110px, 14vh, 160px)',
    paddingBottom: 'clamp(60px, 10vh, 120px)',
    paddingLeft: 'max(20px, 4vw)',
    paddingRight: 'max(20px, 4vw)'
  },
  meta: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: 'var(--mono)',
    fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--muted)',
    marginBottom: 28
  },
  metaDot: {
    width: 6, height: 6, borderRadius: 6, background: 'var(--accent)',
    animation: 'pulse 2.4s ease-in-out infinite'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gridTemplateAreas: '"headline portrait" "body portrait"',
    gridTemplateRows: 'auto 1fr',
    gap: 'clamp(20px, 3vw, 36px) clamp(24px, 5vw, 80px)',
    alignItems: 'start'
  },
  headline: {
    fontFamily: 'var(--serif)',
    fontWeight: 400,
    fontSize: 'clamp(52px, 8.2vw, 134px)',
    lineHeight: 0.92,
    letterSpacing: '-0.025em',
    margin: 0,
    color: 'var(--ink)'
  },
  italic: {
    fontStyle: 'italic',
    color: 'var(--accent)'
  },
  sub: {
    marginTop: 32,
    maxWidth: 540,
    fontSize: 'clamp(15px, 1.4vw, 18px)',
    lineHeight: 1.55,
    color: 'var(--ink-2)'
  },
  ctaRow: {
    marginTop: 36,
    display: 'flex', gap: 14, flexWrap: 'wrap'
  },
  primary: {
    padding: '14px 22px',
    borderRadius: 999,
    background: 'var(--ink)', color: 'var(--bg)',
    border: 'none',
    fontSize: 14, fontWeight: 500, letterSpacing: '0.01em',
    display: 'inline-flex', alignItems: 'center', gap: 10,
    transition: 'transform .25s, background .2s'
  },
  ghost: {
    padding: '14px 22px',
    borderRadius: 999,
    background: 'transparent', color: 'var(--ink)',
    border: '1px solid var(--line-strong)',
    fontSize: 14, fontWeight: 500, letterSpacing: '0.01em',
    display: 'inline-flex', alignItems: 'center', gap: 10,
    transition: 'background .2s'
  },
  portraitCol: {
    display: 'flex', flexDirection: 'column', gap: 14,
    width: '100%',
    justifySelf: 'stretch',
    alignSelf: 'stretch'
  },
  portraitCard: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: 22,
    overflow: 'hidden',
    background: 'var(--bg-2)',
    boxShadow: '0 30px 60px -30px rgba(20,22,28,0.25), 0 1px 0 rgba(255,255,255,0.6) inset',
    border: '1px solid var(--line)'
  },
  portraitImg: {
    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
    display: 'block',
    background: 'var(--bg-2)'
  },
  badge: {
    position: 'absolute', left: 16, top: 16,
    padding: '6px 10px',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    fontFamily: 'var(--mono)',
    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--ink)',
    border: '1px solid var(--line)',
    display: 'inline-flex', alignItems: 'center', gap: 6
  },
  caption: {
    display: 'flex', justifyContent: 'space-between',
    fontFamily: 'var(--mono)',
    fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--muted)'
  },
  arrow: {
    fontFamily: 'var(--serif)', fontStyle: 'italic',
    transition: 'transform .25s'
  }
};

function Hero({ headline }) {
  const text = headline || 'Marketing that compounds.';
  const tokens = text.split(' ');
  const last = tokens.pop();
  const secondLast = tokens.pop() || '';
  const front = tokens.join(' ');

  return (
    <section id="top" style={heroStyles.wrap}>
      <div style={heroStyles.meta} className="reveal">
        <span style={heroStyles.metaDot}></span>
        <span>OPEN TO TECH MARKETING ROLES · Q3 2026</span>
      </div>

      <div style={heroStyles.grid} className="hero-grid">
        <div style={{ gridArea: 'headline' }}>
          <h1 style={heroStyles.headline} className="reveal" data-delay="1">
            {front && <>{front}<br /></>}
            {secondLast ? `${secondLast} ` : ''}
            <span style={heroStyles.italic}>{last}</span>
          </h1>
        </div>
        <div style={{ ...heroStyles.portraitCol, gridArea: 'portrait' }} className="reveal hero-portrait" data-delay="4">
          <div style={heroStyles.portraitCard}>
            <img src="assets/headshot.jpg" alt="Portrait of Saimon Mahboob" style={heroStyles.portraitImg} />
          </div>
        </div>
        <div style={{ gridArea: 'body' }}>
          <p style={heroStyles.sub} className="reveal" data-delay="2">
            I'm <strong style={{ fontWeight: 600 }}>Saimon</strong> — a marketing manager
            with seven years building campaigns that move numbers. Now translating that
            craft into the tools, teams, and products shaping what's next.
          </p>
          <div style={heroStyles.ctaRow} className="reveal" data-delay="3">
            <a href="#work">
              <button style={heroStyles.primary}
              onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';}}
              onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';}}>
                
                See my work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            </a>
            <a href="#contact">
              <button style={heroStyles.ghost}
              onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--bg-2)';}}
              onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';}}>
                
                Get in touch
              </button>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .55; transform: scale(.85); }
        }
        .status-dot {
          width: 7px; height: 7px; border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34,197,94, 0.55);
          animation: dotBlink 1.6s ease-in-out infinite, dotGlow 1.6s ease-out infinite;
        }
        @keyframes dotBlink {
          0%, 60%, 100% { opacity: 1; background: #22c55e; }
          70% { opacity: .35; background: #16a34a; }
          80% { opacity: 1; background: #22c55e; }
          90% { opacity: .55; background: #16a34a; }
        }
        @keyframes dotGlow {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94, 0.65), 0 0 6px 1px rgba(34,197,94, 0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(34,197,94, 0),    0 0 10px 2px rgba(34,197,94, 0.35); }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94, 0),    0 0 6px 1px rgba(34,197,94, 0.6); }
        }
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-areas: "headline" "portrait" "body" !important;
            gap: 32px !important;
          }
          .hero-portrait { max-width: none; width: 100%; }
          .hero-grid h1 { font-size: clamp(44px, 11vw, 64px) !important; }
          .hero-grid p { margin-top: 0 !important; }
        }
      `}</style>
    </section>);

}