// Contact — large CTA block

const CONTACT_VERBS = ['ship', 'launch', 'design', 'make', 'build'];
const VERB_STEP_MS = 380;       // pacing between verbs
const UNDERLINE_DELAY_MS = 260; // pause after “build” lands before underline draws

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

function Contact() {
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
    const t = setTimeout(() => setPrevVerb(null), 360);
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
            <svg
              className={'verb-underline' + (locked ? ' is-drawn' : '')}
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 1.5 6.5 C 18 2.5, 38 8, 55 4.5 S 86 3, 98.5 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
              />
            </svg>
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
          0%   { transform: translateY(0.75em); clip-path: inset(0 -0.3em 100% -0.05em); opacity: 0; }
          55%  { opacity: 1; }
          100% { transform: translateY(0);      clip-path: inset(-0.15em -0.3em -0.08em -0.05em); opacity: 1; }
        }
        @keyframes verb-out {
          0%   { transform: translateY(0);       clip-path: inset(-0.15em -0.3em -0.08em -0.05em); opacity: 1; }
          100% { transform: translateY(-0.75em); clip-path: inset(100% -0.3em 0 -0.05em);          opacity: 0; }
        }
        .verb-in  { animation: verb-in  .46s cubic-bezier(.22,.85,.25,1) both; padding-right: 0.08em; }
        .verb-out { animation: verb-out .34s cubic-bezier(.55,.05,.5,.95) both; padding-right: 0.08em; }

        .verb-underline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0.02em;
          width: 100%;
          height: 0.18em;
          color: var(--accent);
          overflow: visible;
          pointer-events: none;
        }
        .verb-underline path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset .85s cubic-bezier(.65,.05,.35,1);
        }
        .verb-underline.is-drawn path { stroke-dashoffset: 0; }

        @media (prefers-reduced-motion: reduce) {
          .verb-in, .verb-out { animation: none; }
          .verb-underline path { transition: none; stroke-dashoffset: 0; }
        }
        @media (max-width: 720px) {
          .contact-details { flex-direction: column !important; gap: 24px !important; }
          #contact h2 { line-height: 1.08 !important; }
          .verb-underline { bottom: 0.06em; height: 0.14em; }
        }
      `}</style>
    </section>
  );
}
