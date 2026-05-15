// Contact — large CTA block

const CONTACT_VERBS = ['ship', 'launch', 'design', 'make', 'build'];
const VERB_STEP_MS = 520;       // pacing between verbs
const UNDERLINE_DELAY_MS = 320; // pause after “build” lands before underline draws

const contactStyles = {
  wrap: { padding: 'clamp(100px, 16vh, 200px) max(20px, 4vw)', position: 'relative', overflow: 'hidden' },
  inner: { maxWidth: 1100, margin: '0 auto', position: 'relative' },
  eyebrow: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 },
  rule: { width: 24, height: 1, background: 'var(--muted-2)' },
  big: { fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(56px, 10vw, 168px)', lineHeight: 0.95, letterSpacing: '-0.035em', margin: 0, color: 'var(--ink)' },
  italic: { fontStyle: 'italic', color: 'var(--accent)' },
  cta: { marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  primary: { padding: '16px 24px', borderRadius: 999, background: 'var(--ink)', color: 'var(--bg)', border: 'none', fontSize: 15, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'transform .25s' },
  ghost: { padding: '16px 24px', borderRadius: 999, background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-strong)', fontSize: 15, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'background .2s' },
  details: { marginTop: 56, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 'clamp(40px, 6vw, 80px)', paddingTop: 32, borderTop: '1px solid var(--line)', flexWrap: 'wrap' },
  detail: { display: 'flex', flexDirection: 'column', gap: 8, flex: '0 0 auto', minWidth: 0 },
  detailLabel: { fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' },
  detailValue: { fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.25 },
};

function UnderlineMark({ variant }) {
  if (variant === 'none') return null;

  if (variant === 'highlighter') {
    return <span className="verb-highlight" aria-hidden="true" />;
  }

  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    vectorEffect: 'non-scaling-stroke',
  };

  let viewBox = '-6 0 112 14';
  let body;

  switch (variant) {
    case 'brush':
      // Filled tapered brushstroke (no stroke — a shape).
      viewBox = '-6 0 112 16';
      body = (
        <path
          d="M -4 9 C 24 6, 56 12, 104 7.5 C 56 13.5, 24 10.5, -4 10.5 Z"
          fill="currentColor"
        />
      );
      break;
    case 'double':
      body = (
        <>
          <path d="M -2 5.5 L 104 6.5" strokeWidth="5" {...common} />
          <path d="M -2 11.5 L 104 12.5" strokeWidth="5" {...common} />
        </>
      );
      break;
    case 'scribble':
      // Zig-zag back-and-forth, marker-on-paper feel.
      body = (
        <path
          d="M -2 9 L 8 5 L 18 11 L 28 5 L 38 11 L 48 5 L 58 11 L 68 5 L 78 11 L 88 5 L 98 11 L 104 7"
          strokeWidth="6"
          strokeLinejoin="round"
          {...common}
        />
      );
      break;
    case 'squiggle':
      body = (
        <path
          d="M -2 8 C 14 3, 28 13, 42 8 S 70 3, 84 8 S 110 13, 104 8"
          strokeWidth="6"
          {...common}
        />
      );
      break;
    case 'marker':
    default:
      body = (
        <path d="M -2 8 L 104 9.2" strokeWidth="9" {...common} />
      );
  }

  return (
    <svg
      className="verb-underline"
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {body}
    </svg>
  );
}

function Contact({ underline = 'marker' }) {
  const sectionRef = React.useRef(null);
  const [verbIdx, setVerbIdx] = React.useState(0);
  const [prevVerb, setPrevVerb] = React.useState(null);
  const [cycling, setCycling] = React.useState(false);
  const [locked, setLocked] = React.useState(false);

  // Kick off the verb cycle the first time the section enters view.
  React.useEffect(() => {
    if (!sectionRef.current) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setVerbIdx(CONTACT_VERBS.length - 1); setLocked(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCycling(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Advance one verb at a time, capture the outgoing verb so it can animate out.
  React.useEffect(() => {
    if (!cycling) return;
    if (verbIdx >= CONTACT_VERBS.length - 1) {
      const t = setTimeout(() => setLocked(true), UNDERLINE_DELAY_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setPrevVerb(CONTACT_VERBS[verbIdx]);
      setVerbIdx(i => i + 1);
    }, VERB_STEP_MS);
    return () => clearTimeout(t);
  }, [cycling, verbIdx]);

  // Clear the outgoing verb shortly after the swap so it doesn't widen the cell.
  React.useEffect(() => {
    if (!prevVerb) return;
    const t = setTimeout(() => setPrevVerb(null), 560);
    return () => clearTimeout(t);
  }, [prevVerb]);

  const verb = CONTACT_VERBS[verbIdx];

  return (
    <section id="contact" ref={sectionRef} style={contactStyles.wrap}>
      <div style={contactStyles.inner}>
        <div style={contactStyles.eyebrow} className="reveal">
          <span style={contactStyles.rule}></span>
          <span>05 / Get in touch</span>
        </div>
        <h2 style={contactStyles.big} className="reveal" data-delay="1">
          Let's{' '}
          <span
            style={{
              ...contactStyles.italic,
              display: 'inline-grid',
              gridTemplateAreas: '"stack"',
              verticalAlign: 'baseline',
              position: 'relative',
            }}
          >
            {prevVerb && (
              <span
                key={'out-' + prevVerb}
                className="verb-out"
                style={{ gridArea: 'stack', display: 'inline-block', willChange: 'transform, clip-path' }}
              >{prevVerb}</span>
            )}
            <span
              key={'in-' + verb}
              className="verb-in"
              style={{ gridArea: 'stack', display: 'inline-block', willChange: 'transform, clip-path' }}
            >{verb}</span>
            {locked && <UnderlineMark variant={underline} />}
          </span>
          <br/>something.
        </h2>
        <div style={contactStyles.cta} className="reveal" data-delay="2">
          <a href="mailto:mahboobsaimon@gmail.com">
            <button style={contactStyles.primary}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              mahboobsaimon@gmail.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </a>
          <a href="https://www.linkedin.com/in/saimonmahboob/" target="_blank" rel="noopener noreferrer">
            <button style={contactStyles.ghost}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              LinkedIn
            </button>
          </a>
          <a href="tel:9498706468">
            <button style={contactStyles.ghost}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              (949) 870-6468
            </button>
          </a>
        </div>
        <div style={contactStyles.details} className="contact-details reveal" data-delay="3">
          <div style={contactStyles.detail}>
            <span style={contactStyles.detailLabel}>Based in</span>
            <span style={contactStyles.detailValue}>Irvine, CA</span>
          </div>
          <div style={contactStyles.detail}>
            <span style={contactStyles.detailLabel}>Looking for</span>
            <span style={contactStyles.detailValue}>Marketing roles in tech</span>
          </div>
          <div style={contactStyles.detail}>
            <span style={contactStyles.detailLabel}>Availability</span>
            <span style={contactStyles.detailValue}>Open to conversations</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes verb-in {
          0%   { transform: translateY(0.35em); opacity: 0; filter: blur(6px); }
          100% { transform: translateY(0);      opacity: 1; filter: blur(0); }
        }
        @keyframes verb-out {
          0%   { transform: translateY(0);       opacity: 1; filter: blur(0); }
          100% { transform: translateY(-0.35em); opacity: 0; filter: blur(6px); }
        }
        .verb-in  { animation: verb-in  .55s cubic-bezier(.33,.0,.2,1) both;  padding-right: 0.08em; }
        .verb-out { animation: verb-out .55s cubic-bezier(.4,0,.6,1)   both;  padding-right: 0.08em; }

        .verb-underline {
          position: absolute;
          left: -0.04em;
          right: -0.04em;
          bottom: -0.18em;
          width: calc(100% + 0.08em);
          height: 0.38em;
          color: var(--accent);
          overflow: visible;
          pointer-events: none;
          clip-path: inset(0 100% 0 0);
          animation: underline-wipe 1.7s cubic-bezier(.7,.04,.32,1) .05s forwards;
          will-change: clip-path;
        }
        .verb-highlight {
          position: absolute;
          left: -0.08em;
          right: -0.08em;
          top: 0.08em;
          bottom: 0.08em;
          background: var(--accent);
          opacity: 0.22;
          border-radius: 4px;
          pointer-events: none;
          z-index: -1;
          clip-path: inset(0 100% 0 0);
          animation: underline-wipe 1.2s cubic-bezier(.7,.04,.32,1) .05s forwards;
          will-change: clip-path;
        }
        @keyframes underline-wipe {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .verb-in, .verb-out { animation: none; }
          .verb-underline, .verb-highlight { animation: none; clip-path: inset(0 0 0 0); }
        }
        @media (max-width: 720px) {
          .contact-details { flex-direction: column !important; gap: 24px !important; }
          #contact h2 { line-height: 1.08 !important; }
          #contact { padding-top: 72px !important; padding-bottom: 48px !important; }
        }
      `}</style>
    </section>
  );
}
