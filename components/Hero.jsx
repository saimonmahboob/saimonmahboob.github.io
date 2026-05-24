// Hero — editorial split layout, oversized serif headline + portrait card

// ===== Dramatic intro overlays =====

function ShowcaseIntro({ onDone }) {
  const words = ['I', 'build', 'marketing', 'that earns', 'its budget', 'back.'];
  const WORD_MS = 440;
  const START_DELAY = 280;
  const LAST_HOLD = 480;
  const MORPH_MS = 820;

  const [ready, setReady] = React.useState(false);
  const [phase, setPhase] = React.useState('manifesto');
  const [wordIdx, setWordIdx] = React.useState(-1);
  const backRef = React.useRef(null);
  const morphedRef = React.useRef(false);
  const targetRef = React.useRef(null);

  // Wait for fonts before any animation timers run — prevents FOUT mid-intro.
  React.useEffect(() => {
    let alive = true;
    const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    const fallback = new Promise(r => setTimeout(r, 1500));
    Promise.race([fontsReady, fallback]).then(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    const timers = [];
    timers.push(setTimeout(() => setWordIdx(0), START_DELAY));
    words.forEach((_, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => setWordIdx(i), START_DELAY + i * WORD_MS));
    });
    const morphAt = START_DELAY + words.length * WORD_MS + LAST_HOLD;
    timers.push(setTimeout(() => setPhase('morphing'), morphAt));
    timers.push(setTimeout(() => {
      const t = targetRef.current || document.querySelector('[data-back-target]');
      if (t) t.style.visibility = '';
      setPhase('done');
      onDone && onDone();
    }, morphAt + MORPH_MS));
    return () => timers.forEach(clearTimeout);
  }, [ready]);

  // Position "back." at viewport center once it mounts (the last manifesto word).
  React.useLayoutEffect(() => {
    if (wordIdx !== words.length - 1) return;
    const node = backRef.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    node.style.top = ((vh - r.height) / 2) + 'px';
    node.style.left = ((vw - r.width) / 2) + 'px';
    // Defer a frame so the position write commits before the entrance transition.
    requestAnimationFrame(() => {
      node.style.opacity = '1';
      node.style.transform = 'none';
      node.style.filter = 'none';
    });
  }, [wordIdx]);

  // FLIP morph (pixel-space — no percentage translates).
  React.useLayoutEffect(() => {
    if (phase !== 'morphing' || morphedRef.current) return;
    const node = backRef.current;
    const target = document.querySelector('[data-back-target]');
    if (!node || !target) return;
    morphedRef.current = true;
    targetRef.current = target;

    const first = node.getBoundingClientRect();
    const firstFs = parseFloat(window.getComputedStyle(node).fontSize);

    target.style.visibility = 'hidden';
    const last = target.getBoundingClientRect();
    const lastCs = window.getComputedStyle(target);
    const lastFs = parseFloat(lastCs.fontSize);

    node.style.transition = 'none';
    node.style.top = last.top + 'px';
    node.style.left = last.left + 'px';
    node.style.fontSize = lastFs + 'px';
    node.style.lineHeight = lastCs.lineHeight;
    node.style.letterSpacing = lastCs.letterSpacing;

    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const scale = firstFs / lastFs;
    node.style.transformOrigin = 'top left';
    node.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

    void node.offsetWidth;
    node.style.transition = `transform ${MORPH_MS}ms cubic-bezier(.7,.04,.32,1), color ${MORPH_MS}ms cubic-bezier(.7,.04,.32,1)`;
    node.style.transform = 'none';
    node.style.color = lastCs.color;
  }, [phase]);

  React.useEffect(() => () => {
    const t = targetRef.current || document.querySelector('[data-back-target]');
    if (t) t.style.visibility = '';
  }, []);

  if (phase === 'done') return null;

  const isLast = wordIdx === words.length - 1;

  return (
    <div className={`hero-overlay hero-showcase phase-${phase}`} aria-hidden="true">
      {wordIdx >= 0 && !isLast && phase === 'manifesto' && (
        <div className="hero-showcase-word" key={wordIdx}>
          <span className={words[wordIdx] === 'build' ? 'is-italic' : ''}>{words[wordIdx]}</span>
        </div>
      )}
      {(isLast || phase === 'morphing') && (
        <span ref={backRef} className="hero-showcase-back">back.</span>
      )}
    </div>
  );
}

function ManifestoIntro({ onDone }) {
  const words = ['I', 'build', 'marketing', 'that earns', 'its budget', 'back.'];
  const WORD_MS = 440;
  const [idx, setIdx] = React.useState(0);
  const [fading, setFading] = React.useState(false);
  React.useEffect(() => {
    const timers = [];
    words.forEach((_, i) => { if (i > 0) timers.push(setTimeout(() => setIdx(i), i * WORD_MS)); });
    timers.push(setTimeout(() => setFading(true), words.length * WORD_MS + 160));
    timers.push(setTimeout(() => onDone && onDone(), words.length * WORD_MS + 160 + 520));
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div className={`hero-overlay hero-manifesto ${fading ? 'is-fading' : ''}`} aria-hidden="true">
      <div className="hero-manifesto-word" key={idx}>
        <span className={words[idx] === 'build' ? 'is-italic' : ''}>{words[idx]}</span>
      </div>
    </div>
  );
}

function NameTakeoverIntro({ onDone }) {
  const [phase, setPhase] = React.useState('hold');
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase('shrink'), 1050);
    const t2 = setTimeout(() => { setPhase('done'); onDone && onDone(); }, 1050 + 760);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (phase === 'done') return null;
  return (
    <div className={`hero-overlay hero-nametake phase-${phase}`} aria-hidden="true">
      <span className="hero-nametake-text">Saimon Mahboob</span>
    </div>
  );
}

function PortraitTakeoverIntro({ targetRef, src, onDone }) {
  const cloneRef = React.useRef(null);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    const t1 = setTimeout(() => {
      const c = cloneRef.current, t = targetRef && targetRef.current;
      if (c && t) {
        const r = t.getBoundingClientRect();
        c.style.transition = 'top 900ms cubic-bezier(.7,.04,.32,1), left 900ms cubic-bezier(.7,.04,.32,1), width 900ms cubic-bezier(.7,.04,.32,1), height 900ms cubic-bezier(.7,.04,.32,1), border-radius 900ms cubic-bezier(.7,.04,.32,1)';
        c.style.top = r.top + 'px';
        c.style.left = r.left + 'px';
        c.style.width = r.width + 'px';
        c.style.height = r.height + 'px';
        c.style.borderRadius = '22px';
      }
    }, 1150);
    const t2 = setTimeout(() => { setDone(true); onDone && onDone(); }, 1150 + 900 + 80);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (done) return null;
  return (
    <div ref={cloneRef} className="hero-overlay hero-porttake" aria-hidden="true">
      <img src={src} alt="" />
    </div>
  );
}

function CurtainIntro({ onDone }) {
  const [phase, setPhase] = React.useState('enter');
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 620);
    const t2 = setTimeout(() => setPhase('split'), 620 + 380);
    const t3 = setTimeout(() => setPhase('paint'), 620 + 380 + 240);
    const t4 = setTimeout(() => { setPhase('done'); onDone && onDone(); }, 620 + 380 + 720 + 600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);
  if (phase === 'done') return null;
  return (
    <>
      <div className={`hero-overlay hero-curtain phase-${phase}`} aria-hidden="true">
        <div className="hero-curtain-panel" style={{ '--i': 0 }} />
        <div className="hero-curtain-panel" style={{ '--i': 1 }} />
        <div className="hero-curtain-panel" style={{ '--i': 2 }} />
      </div>
      {(phase === 'paint' || phase === 'split') && (
        <div className="hero-overlay hero-bigbrush" aria-hidden="true">
          <svg viewBox="-6 0 112 16" preserveAspectRatio="none">
            <path d="M -4 9 C 24 6, 56 12, 104 7.5 C 56 13.5, 24 10.5, -4 10.5 Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </>
  );
}

function HeroUnderlineMark({ variant }) {
  if (variant === 'none') return null;
  if (variant === 'highlighter') {
    return <span className="hf-mark-highlight" aria-hidden="true" />;
  }
  const common = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', vectorEffect: 'non-scaling-stroke' };
  let viewBox = '-6 0 112 14';
  let body;
  switch (variant) {
    case 'brush':
      viewBox = '-6 0 112 16';
      body = <path d="M -4 9 C 24 6, 56 12, 104 7.5 C 56 13.5, 24 10.5, -4 10.5 Z" fill="currentColor" />;
      break;
    case 'double':
      body = (<>
        <path d="M -2 5.5 L 104 6.5" strokeWidth="5" {...common} />
        <path d="M -2 11.5 L 104 12.5" strokeWidth="5" {...common} />
      </>);
      break;
    case 'scribble':
      body = <path d="M -2 9 L 8 5 L 18 11 L 28 5 L 38 11 L 48 5 L 58 11 L 68 5 L 78 11 L 88 5 L 98 11 L 104 7" strokeWidth="6" strokeLinejoin="round" {...common} />;
      break;
    case 'squiggle':
      body = <path d="M -2 8 C 14 3, 28 13, 42 8 S 70 3, 84 8 S 110 13, 104 8" strokeWidth="6" {...common} />;
      break;
    case 'marker':
    default:
      body = <path d="M -2 8 L 104 9.2" strokeWidth="9" {...common} />;
  }
  return (
    <svg className="hf-mark-underline" viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">{body}</svg>
  );
}

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
    gridTemplateColumns: 'minmax(0, 1.8fr) minmax(240px, 1fr)',
    gridTemplateAreas: '"headline portrait" "body portrait"',
    gridTemplateRows: 'auto 1fr',
    gap: 'clamp(20px, 3vw, 36px) clamp(24px, 5vw, 80px)',
    alignItems: 'start'
  },
  headline: {
    fontFamily: 'var(--serif)',
    fontWeight: 400,
    fontSize: 'clamp(44px, 7.2vw, 124px)',
    lineHeight: 1.02,
    letterSpacing: '-0.025em',
    margin: 0,
    color: 'var(--ink)',
    textWrap: 'balance'
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

function Hero({ headline, flare = 'none', perWordRise = false, underline = 'marker', intro = 'off' }) {
  const text = headline || 'Marketing that *compounds*.';

  const isOff = intro === 'off';
  const isBold = intro === 'bold';
  const isOn = !isOff;
  const [colorOn, setColorOn] = React.useState(isOff);
  const [prerollState, setPrerollState] = React.useState(isBold ? 'visible' : 'gone');
  const [punchPlayed, setPunchPlayed] = React.useState(isOff);
  const wrapRef = React.useRef(null);
  const portraitRef = React.useRef(null);

  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dramatic = ['manifesto', 'name-takeover', 'portrait-takeover', 'curtain'];
    if (isOff || reduce) {
      setColorOn(true);
      setPrerollState('gone');
      setPunchPlayed(true);
      return;
    }
    setColorOn(false);
    setPrerollState(isBold ? 'visible' : 'gone');
    setPunchPlayed(false);
    if (dramatic.includes(intro)) {
      // overlay component will signal completion via onDramaticDone
      return;
    }
    const timers = [];
    if (isBold) {
      timers.push(setTimeout(() => setPrerollState('sliding'), 700));
      timers.push(setTimeout(() => { setPrerollState('gone'); setColorOn(true); setPunchPlayed(true); }, 700 + 560));
    } else {
      timers.push(setTimeout(() => { setColorOn(true); setPunchPlayed(true); }, 540));
    }
    return () => timers.forEach(clearTimeout);
  }, [intro]);

  const onDramaticDone = React.useCallback(() => {
    setColorOn(true);
    setPunchPlayed(true);
  }, []);

  React.useEffect(() => {
    if (isOff) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0, tx = 0, ty = 0, dx = 0, dy = 0;
    const tick = () => {
      tx += (dx - tx) * 0.12;
      ty += (dy - ty) * 0.12;
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const handle = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      dx = -x * 12;
      dy = -y * 10;
    };
    const leave = () => { dx = 0; dy = 0; };
    wrap.addEventListener('mousemove', handle);
    wrap.addEventListener('mouseleave', leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('mousemove', handle);
      wrap.removeEventListener('mouseleave', leave);
      if (portraitRef.current) portraitRef.current.style.transform = '';
    };
  }, [intro]);

  // Parse *word* markers — the wrapped phrase becomes the italic accent.
  // Falls back to the last word if no markers are present.
  let beforeText = '', italicWord = '', afterText = '';
  const m = text.match(/^([\s\S]*?)\*([^*]+)\*([\s\S]*)$/);
  if (m) {
    beforeText = m[1];
    italicWord = m[2];
    afterText = m[3];
  } else {
    const t = text.split(' ');
    italicWord = t.pop() || text;
    beforeText = t.length ? t.join(' ') + ' ' : '';
    afterText = '';
  }
  const beforeTokens = beforeText.trim().length ? beforeText.trim().split(/\s+/) : [];
  const afterTokens = afterText.trim().length ? afterText.trim().split(/\s+/) : [];

  let wordIdx = 0;
  const renderWord = (w, key, extraProps) => {
    const i = wordIdx++;
    if (!perWordRise) return <React.Fragment key={key}>{w}{'\u00A0'}</React.Fragment>;
    return (
      <span key={key} className="hf-word" style={{ animationDelay: `${i * 90 + 120}ms` }} {...(extraProps || {})}>
        {w}{'\u00A0'}
      </span>
    );
  };

  const renderItalicWord = (w) => {
    const i = wordIdx++;
    const style = { ...heroStyles.italic };
    if (perWordRise) style.animationDelay = `${i * 90 + 120}ms`;
    const classes = ['hf-last', 'hf-mono-tint'];
    if (perWordRise) classes.push('hf-word');
    return (
      <span className={classes.join(' ')} style={style}>
        {w}
        {flare === 'underline' && <HeroUnderlineMark variant={underline} />}
      </span>
    );
  };

  const h1Classes = ['hf-h1', `hf-flare-${flare}`];
  if (perWordRise) h1Classes.push('hf-rise');
  else h1Classes.push('reveal');

  const sectionClasses = ['hero-section'];
  if (isOn && !punchPlayed) sectionClasses.push('hero-intro-pending');
  if (isOn && punchPlayed) sectionClasses.push('hero-intro-active');

  return (
    <section id="top" ref={wrapRef} style={heroStyles.wrap} className={sectionClasses.join(' ')}>
      {intro === 'showcase' && (
        <ShowcaseIntro onDone={onDramaticDone} />
      )}
      {intro === 'manifesto' && <ManifestoIntro onDone={onDramaticDone} />}
      {intro === 'name-takeover' && <NameTakeoverIntro onDone={onDramaticDone} />}
      {intro === 'portrait-takeover' && <PortraitTakeoverIntro targetRef={portraitRef} src="assets/headshot.jpg" onDone={onDramaticDone} />}
      {intro === 'curtain' && <CurtainIntro onDone={onDramaticDone} />}
      {isBold && prerollState !== 'gone' && (
        <div className={`hero-preroll ${prerollState === 'sliding' ? 'is-sliding' : ''}`} aria-hidden="true">
          <span>Saimon Mahboob</span>
        </div>
      )}
      <div style={heroStyles.meta} className="reveal">
        <span style={heroStyles.metaDot} className="hf-mono-bg"></span>
        <span>OPEN TO TECH MARKETING ROLES · Q3 2026</span>
      </div>

      <div style={heroStyles.grid} className="hero-grid">
        <div style={{ gridArea: 'headline' }}>
          <h1
            key={`${flare}-${perWordRise}-${text}`}
            style={heroStyles.headline}
            className={h1Classes.join(' ')}
            data-delay="1"
          >
            {beforeTokens.map((w, i) => renderWord(w, `b-${i}`))}
            {renderItalicWord(italicWord)}
            {afterTokens.length > 0 && '\u00A0'}
            {afterTokens.map((w, i) => {
              const isLast = i === afterTokens.length - 1;
              return renderWord(w, `a-${i}`, isLast ? { 'data-back-target': '' } : null);
            })}
          </h1>
        </div>
        <div style={{ ...heroStyles.portraitCol, gridArea: 'portrait' }} className="reveal hero-portrait" data-delay="4">
          <div ref={portraitRef} style={{ ...heroStyles.portraitCard, willChange: isOn ? 'transform' : 'auto', transition: 'transform .35s cubic-bezier(.2,.7,.2,1)' }}>
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
        /* ---------- Dramatic intro overlays ---------- */
        .hero-overlay { position: fixed; inset: 0; z-index: 9000; pointer-events: none; }

        /* Showcase: pre-roll name → manifesto words (single accent background) */
        .hero-showcase {
          background: var(--accent);
          color: var(--bg);
          font-family: var(--serif);
          overflow: hidden;
          transition: opacity ${480}ms ease-out;
        }
        .hero-showcase.phase-fading { opacity: 0; }
        .hero-showcase.phase-morphing { background: transparent; transition: background 700ms cubic-bezier(.7,.04,.32,1); }
        .hero-showcase.phase-morphing .hero-showcase-name { display: none; }
        /* "back." word — fixed, positioned via JS in pixels. No percentage translates. */
        .hero-showcase-back {
          position: fixed;
          top: 0; left: 0;
          font-family: var(--serif);
          font-size: clamp(80px, 22vw, 320px);
          line-height: 0.95;
          letter-spacing: -0.045em;
          color: var(--bg);
          white-space: nowrap;
          opacity: 0;
          transform: translateY(22px) scale(.96);
          filter: blur(6px);
          transition:
            opacity 540ms cubic-bezier(.22,.61,.36,1),
            transform 560ms cubic-bezier(.22,.61,.36,1),
            filter 480ms cubic-bezier(.22,.61,.36,1);
          will-change: top, left, transform, color, font-size, filter, opacity;
        }
        .hero-showcase-name {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-style: italic;
          font-size: clamp(48px, 11vw, 168px);
          letter-spacing: -0.035em;
          transform: translateY(0);
          transition: transform 520ms cubic-bezier(.74,.06,.28,1);
        }
        .hero-showcase.phase-preroll-out .hero-showcase-name,
        .hero-showcase.phase-manifesto .hero-showcase-name,
        .hero-showcase.phase-morphing .hero-showcase-name {
          transform: translateY(-110%);
        }
        .hero-showcase-word {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 4vw;
          letter-spacing: -0.045em;
          font-size: clamp(80px, 22vw, 320px);
          line-height: 0.95;
          text-align: center;
          white-space: nowrap;
          animation: manifesto-word 560ms cubic-bezier(.22,.61,.36,1) both;
        }
        .hero-showcase-word .is-italic { font-style: italic; }

        /* Manifesto (standalone) */
        .hero-manifesto {
          background: var(--accent);
          color: var(--bg);
          display: flex; align-items: center; justify-content: center;
          transition: opacity 480ms ease-out;
          font-family: var(--serif);
          letter-spacing: -0.045em;
          padding: 4vw;
        }
        .hero-manifesto.is-fading { opacity: 0; }
        .hero-manifesto-word {
          font-size: clamp(80px, 22vw, 320px);
          line-height: 0.95;
          text-align: center;
          animation: manifesto-word 560ms cubic-bezier(.22,.61,.36,1) both;
          white-space: nowrap;
        }
        .hero-manifesto-word .is-italic { font-style: italic; }
        @keyframes manifesto-word {
          0%   { opacity: 0; transform: translateY(22px) scale(.96); filter: blur(6px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        /* Name takeover: full-bleed name shrinks toward nav */
        .hero-nametake {
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          transition: background 600ms ease;
        }
        .hero-nametake.phase-shrink { background: rgba(47,75,255,0); }
        .hero-nametake-text {
          font-family: var(--serif); font-style: italic;
          font-size: clamp(48px, 13vw, 200px);
          letter-spacing: -0.035em;
          color: var(--bg);
          will-change: transform, color, font-size;
          transform: translate(0, 0);
          transition: transform 760ms cubic-bezier(.7,.04,.32,1), color 500ms ease 240ms, font-size 760ms cubic-bezier(.7,.04,.32,1);
        }
        .hero-nametake.phase-shrink .hero-nametake-text {
          color: var(--ink);
          font-size: 16px;
          transform: translate(calc(-50vw + 90px), calc(-50vh + 32px));
        }

        /* Portrait takeover: img fills viewport, animates to card */
        .hero-porttake {
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: var(--bg-2);
          border-radius: 0;
          overflow: hidden;
          will-change: top, left, width, height, border-radius;
        }
        .hero-porttake img {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          display: block;
        }

        /* Curtain: three vertical panels, drop then split */
        .hero-curtain {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
        }
        .hero-curtain-panel {
          background: var(--accent);
          transform: translateY(-101%);
          transition: transform 600ms cubic-bezier(.7,.04,.32,1);
          transition-delay: calc(var(--i) * 80ms);
        }
        .hero-curtain-panel:nth-child(2) { background: var(--ink); }
        .hero-curtain.phase-hold .hero-curtain-panel,
        .hero-curtain.phase-enter .hero-curtain-panel { transform: translateY(0); }
        .hero-curtain.phase-split .hero-curtain-panel:nth-child(odd),
        .hero-curtain.phase-paint .hero-curtain-panel:nth-child(odd) {
          transform: translateY(-101%);
          transition-duration: 720ms; transition-delay: 0ms;
        }
        .hero-curtain.phase-split .hero-curtain-panel:nth-child(even),
        .hero-curtain.phase-paint .hero-curtain-panel:nth-child(even) {
          transform: translateY(101%);
          transition-duration: 720ms; transition-delay: 80ms;
        }
        .hero-bigbrush {
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .hero-bigbrush svg {
          width: 78vw; height: 22vh;
          opacity: 0;
          transform: scaleX(0); transform-origin: left center;
          animation: bigbrush-paint 720ms cubic-bezier(.7,.04,.32,1) forwards;
        }
        @keyframes bigbrush-paint {
          0%   { opacity: 0; transform: scaleX(0); }
          15%  { opacity: 1; }
          70%  { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-overlay { display: none !important; }
        }

        /* ---------- Intro choreography (color swim-in + brand pre-roll) ---------- */
        .hf-mono-tint { transition: color 700ms cubic-bezier(.2,.7,.2,1); }
        .hf-mono-bg   { transition: background-color 700ms cubic-bezier(.2,.7,.2,1); }
        .hero-mono .hf-mono-tint { color: #b8b4a8 !important; }
        .hero-mono .hf-mono-bg   { background-color: #b8b4a8 !important; }
        .hero-mono .hf-mark-underline,
        .hero-mono .hf-mark-highlight { animation-play-state: paused !important; }

        .hero-preroll {
          position: fixed; inset: 0; z-index: 9000;
          background: var(--accent);
          color: var(--bg);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--serif); font-style: italic;
          font-size: clamp(40px, 8.5vw, 116px);
          letter-spacing: -0.025em;
          transform: translateY(0);
          transition: transform 560ms cubic-bezier(.74,.06,.28,1);
          will-change: transform;
        }
        .hero-preroll.is-sliding { transform: translateY(-101%); }

        /* Punch on the italic word during choreographed intro */
        .hero-intro-active .hf-last,
        .hero-intro-pending .hf-last {
          animation: hf-punch 920ms cubic-bezier(.18,.85,.22,1.08) both !important;
          animation-delay: 380ms !important;
        }
        @keyframes hf-punch {
          0%   { opacity: 0; transform: translateY(36px) scale(.94); }
          55%  { opacity: 1; transform: translateY(-7px) scale(1.035); }
          78%  { transform: translateY(2px) scale(.998); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-preroll { display: none; }
          .hero-intro-active .hf-last, .hero-intro-pending .hf-last { animation: none !important; transform: none !important; opacity: 1 !important; }
        }

        /* ---------- Headline flare ---------- */
        .hf-h1 { position: relative; }
        .hf-last { position: relative; display: inline-block; }

        /* Per-word rise reveal */
        .hf-rise .hf-word,
        .hf-rise .hf-last {
          display: inline-block;
          opacity: 0;
          transform: translateY(14px);
          animation: hf-rise-in 820ms cubic-bezier(.22,.61,.36,1) both;
        }
        .hf-rise .hf-last { animation-delay: var(--last-delay, 0ms); }
        @keyframes hf-rise-in {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Boomerang slide-in on "back." — overrides per-word rise for that word */
        .hf-flare-boomerang .hf-last {
          display: inline-block;
          animation: hf-boomerang 1000ms cubic-bezier(.18,.78,.22,1) both;
          animation-delay: 380ms;
        }
        @keyframes hf-boomerang {
          0%   { transform: translateX(80px); opacity: 0; }
          55%  { transform: translateX(-14px); opacity: 1; }
          78%  { transform: translateX(6px); }
          100% { transform: translateX(0); opacity: 1; }
        }

        /* Ledger underline — draws beneath the italic accent word */
        .hf-flare-ledger .hf-last::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -0.06em;
          height: 2px;
          background: var(--accent);
          transform-origin: left center;
          transform: scaleX(0);
          animation: hf-ledger 1100ms 520ms cubic-bezier(.6,.04,.2,1) forwards;
        }
        @keyframes hf-ledger {
          to { transform: scaleX(1); }
        }

        /* Underline mark (same component as Contact section) */
        .hf-mark-underline {
          position: absolute;
          left: -0.04em; right: -0.04em;
          bottom: -0.16em;
          width: calc(100% + 0.08em);
          height: 0.36em;
          color: var(--accent);
          overflow: visible;
          pointer-events: none;
          clip-path: inset(0 100% 0 0);
          animation: hf-mark-wipe 1.5s cubic-bezier(.7,.04,.32,1) .45s forwards;
          will-change: clip-path;
        }
        .hf-mark-highlight {
          position: absolute;
          left: -0.08em; right: -0.08em;
          top: 0.08em; bottom: 0.08em;
          background: var(--accent);
          opacity: 0.22;
          border-radius: 4px;
          pointer-events: none;
          z-index: -1;
          clip-path: inset(0 100% 0 0);
          animation: hf-mark-wipe 1.1s cubic-bezier(.7,.04,.32,1) .45s forwards;
        }
        @keyframes hf-mark-wipe {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hf-rise .hf-word, .hf-rise .hf-last,
          .hf-flare-boomerang .hf-last { animation: none; opacity: 1; transform: none; }
          .hf-flare-ledger .hf-last::after { animation: none; transform: scaleX(1); }
          .hf-mark-underline, .hf-mark-highlight { animation: none; clip-path: inset(0 0 0 0); }
        }

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