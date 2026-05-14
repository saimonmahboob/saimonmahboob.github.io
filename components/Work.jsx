// Work — selected case studies

const workStyles = {
  wrap: { padding: 'clamp(80px, 12vh, 140px) max(20px, 4vw)', background: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32, marginBottom: 56 },
  eyebrow: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 },
  rule: { width: 24, height: 1, background: 'var(--muted-2)' },
  title: { fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 59, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0, color: 'var(--ink)', maxWidth: 920 },
  italic: { fontStyle: 'italic', color: 'var(--accent)' },
  intro: { fontSize: 14, lineHeight: 1.55, color: 'var(--muted)', maxWidth: 320 },
  list: { display: 'flex', flexDirection: 'column' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(28px, 4vw, 64px)', padding: '40px 0', borderTop: '1px solid var(--line)', alignItems: 'flex-start' },
  rowLast: { borderBottom: '1px solid var(--line)' },
  visual: { aspectRatio: '4/3', borderRadius: 16, border: '1px solid var(--line)', background: 'var(--bg)', overflow: 'hidden', position: 'relative' },
  body: { display: 'flex', flexDirection: 'column', gap: 14 },
  index: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted-2)' },
  org: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' },
  caseTitle: { fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 },
  desc: { fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0, maxWidth: 560 },
  pills: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  pill: { padding: '5px 11px', borderRadius: 999, border: '1px solid var(--line-strong)', fontSize: 12, color: 'var(--ink-2)' },
  resultRow: { display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 18, paddingTop: 18, borderTop: '1px dashed var(--line)' },
  rNum: { fontFamily: 'var(--serif)', fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em' },
  rUnit: { fontStyle: 'italic', color: 'var(--accent)' },
  rLabel: { fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }
};

function Visual({ kind }) {
  if (kind === 'fundraise') {
    return (
      <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="fg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="var(--bg)" />
        {[60, 120, 180, 240].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />)}
        <path d="M 0 250 Q 80 240 130 220 T 230 160 T 320 80 T 400 30 L 400 300 L 0 300 Z" fill="url(#fg1)" />
        <path d="M 0 250 Q 80 240 130 220 T 230 160 T 320 80 T 400 30" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        {[[40, 247], [130, 220], [230, 160], [320, 80], [395, 32]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="var(--accent)" />)}
        <text x="20" y="36" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--muted)" letterSpacing="2">CUMULATIVE RAISED</text>
        <text x="20" y="278" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--muted-2)" letterSpacing="2">2019</text>
        <text x="358" y="278" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--muted-2)" letterSpacing="2">2026</text>
      </svg>);

  }
  if (kind === 'live') {
    return (
      <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
        <rect width="400" height="300" fill="var(--bg)" />
        <rect x="40" y="50" width="320" height="180" rx="10" fill="var(--ink)" />
        <circle cx="200" cy="140" r="30" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.85" />
        <polygon points="192,126 192,154 216,140" fill="#fff" />
        <rect x="56" y="206" width="280" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
        <rect x="56" y="206" width="170" height="5" rx="2.5" fill="var(--accent)" />
        <circle cx="60" cy="74" r="5" fill="#ef4444" />
        <text x="72" y="78" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#fff" letterSpacing="2">LIVE · Q4</text>
        <text x="20" y="278" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--muted)" letterSpacing="2">QUARTERLY BROADCAST · +30%</text>
      </svg>);

  }
  if (kind === 'email') {
    return (
      <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
        <rect width="400" height="300" fill="var(--bg)" />
        {[0, 1, 2].map((i) =>
        <rect key={i} x={64 + i * 14} y={56 + i * 14} width="232" height="170" rx="6" fill="var(--paper)" stroke="var(--line-strong)" strokeWidth="1" />
        )}
        <rect x="92" y="100" width="180" height="10" rx="2" fill="var(--ink)" />
        <rect x="92" y="120" width="180" height="6" rx="2" fill="var(--line-strong)" />
        <rect x="92" y="132" width="140" height="6" rx="2" fill="var(--line-strong)" />
        <rect x="92" y="174" width="84" height="26" rx="13" fill="var(--accent)" />
        <text x="20" y="278" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--muted)" letterSpacing="2">LIFECYCLE A/B · +8% ENGAGEMENT</text>
      </svg>);

  }
  return (
    <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
      <rect width="400" height="300" fill="var(--bg)" />
      {Array.from({ length: 14 }).map((_, i) =>
      <rect key={i} x={40} y={48 + i * 14} width={60 + i * 73 % 240} height={4} rx="2"
      fill={i % 4 === 0 ? 'var(--accent)' : 'var(--line-strong)'} />
      )}
      <text x="20" y="278" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--muted)" letterSpacing="2">OUTBOUND SEQUENCE · 40+/DAY</text>
    </svg>);

}

function Row({ idx, item, last }) {
  return (
    <div style={{ ...workStyles.row, ...(last ? workStyles.rowLast : {}) }} className="reveal work-row">
      <div style={workStyles.visual}><Visual kind={item.kind} /></div>
      <div style={workStyles.body}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={workStyles.index}>Case · {String(idx + 1).padStart(2, '0')}</span>
          <span style={workStyles.org}>{item.org}</span>
        </div>
        <h3 style={workStyles.caseTitle}>{item.title}</h3>
        <p style={workStyles.desc}>{item.desc}</p>
        <div style={workStyles.pills}>
          {item.pills.map((p) => <span key={p} style={workStyles.pill}>{p}</span>)}
        </div>
        <div style={workStyles.resultRow}>
          {item.results.map((r, i) =>
          <div key={i}>
              <div style={workStyles.rNum}>{r.n}<span style={workStyles.rUnit}>{r.u || ''}</span></div>
              <div style={workStyles.rLabel}>{r.l}</div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .work-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>);

}

function Work() {
  return (
    <section id="work" style={workStyles.wrap}>
      <div style={workStyles.head}>
        <div className="reveal">
          <div style={workStyles.eyebrow}>
            <span style={workStyles.rule}></span>
            <span>02 / Selected work</span>
          </div>
          <h2 style={workStyles.title}>
            Six cases.<br />The work behind <span style={workStyles.italic}>the metrics</span>.
          </h2>
        </div>
        <p style={workStyles.intro} className="reveal" data-delay="1">
          A shortlist from the last seven years. Each one earned its place by moving something: a metric, a brand, a community.
        </p>
      </div>

      <Accordion startIdx={0} />
    </section>);

}

// ─────────────────────────────────────────────────────────────────────
// Accordion portfolio items
// ─────────────────────────────────────────────────────────────────────

const accStyles = {
  list: { display: 'flex', flexDirection: 'column' },
  item: { borderTop: '1px solid var(--line)' },
  itemLast: { borderBottom: '1px solid var(--line)' },
  header: {
    display: 'grid',
    gridTemplateColumns: '64px 220px 1fr auto',
    gap: 'clamp(16px, 3vw, 40px)',
    padding: '28px 0',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    transition: 'padding .25s ease',
    fontFamily: 'inherit'
  },
  index: {
    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
    color: 'var(--muted-2)'
  },
  tag: {
    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: 'var(--muted)'
  },
  headTitleWrap: { display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 },
  headTitle: {
    fontFamily: 'var(--serif)', fontWeight: 400,
    fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.15,
    letterSpacing: '-0.015em', color: 'var(--ink)', margin: 0
  },
  headOrg: {
    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'var(--muted)'
  },
  chevWrap: {
    width: 36, height: 36, borderRadius: 999,
    border: '1px solid var(--line-strong)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background .25s ease, border-color .25s ease, transform .35s cubic-bezier(.2,.7,.2,1)',
    flexShrink: 0
  },
  panel: {
    overflow: 'hidden',
    transition: 'grid-template-rows .45s cubic-bezier(.2,.7,.2,1)',
    display: 'grid'
  },
  panelInner: {
    minHeight: 0,
    padding: '8px 0 40px',
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: 'clamp(28px, 4vw, 64px)',
    alignItems: 'flex-start'
  },
  imgPlaceholder: {
    aspectRatio: '4/3', borderRadius: 16, border: '1px dashed var(--line-strong)',
    background: 'var(--bg-2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11,
    letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center',
    padding: 16
  },
  statCard: {
    aspectRatio: '4/3', borderRadius: 16,
    background: 'color-mix(in srgb, #1f3d2e 92%, transparent)',
    color: '#eaf3ec',
    padding: 'clamp(20px, 2.4vw, 32px)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 18,
    alignContent: 'center'
  },
  statBig: {
    fontFamily: 'var(--serif)', fontWeight: 400,
    fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1,
    letterSpacing: '-0.02em'
  },
  statLabel: {
    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: 'rgba(234,243,236,0.7)',
    marginTop: 6
  },
  body: { display: 'flex', flexDirection: 'column', gap: 14 },
  desc: { fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0, maxWidth: 620, whiteSpace: 'pre-line' },
  statsInline: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '14px 28px', marginTop: 6,
    paddingTop: 18, borderTop: '1px dashed var(--line)'
  },
  inlineStatBig: {
    fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.1, color: 'var(--ink)',
    letterSpacing: '-0.01em'
  },
  inlineStatLabel: {
    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4
  },
  pills: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  pill: { padding: '5px 11px', borderRadius: 999, border: '1px solid var(--line-strong)', fontSize: 12, color: 'var(--ink-2)' }
};

function Chevron({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke={open ? '#fff' : 'currentColor'} strokeWidth="2"
    style={{ transition: 'transform .35s cubic-bezier(.2,.7,.2,1)', transform: open ? 'rotate(180deg)' : 'none' }}>
      <path d="M6 9l6 6 6-6" />
    </svg>);

}

function StatCard({ stats }) {
  return (
    <div style={accStyles.statCard}>
      {stats.map((s, i) =>
      <div key={i}>
          <div style={accStyles.statBig}>{s.n}</div>
          <div style={accStyles.statLabel}>{s.l}</div>
        </div>
      )}
    </div>);

}

function EmbedPlaceholder({ src }) {
  const [html, setHtml] = React.useState('');
  React.useEffect(() => {
    let alive = true;
    fetch(src).then((r) => r.text()).then((t) => {if (alive) setHtml(t);});
    return () => {alive = false;};
  }, [src]);
  return (
    <div style={{ ...accStyles.imgPlaceholder, padding: 0, border: 'none', overflow: 'hidden', borderRadius: 16, background: '#0c0c0f' }}
    dangerouslySetInnerHTML={{ __html: html }} />);

}

// Inline embed-fragment used inside MixedCarousel slides (no outer 4:3 wrapper)
function InlineEmbed({ src }) {
  const [html, setHtml] = React.useState('');
  React.useEffect(() => {
    let alive = true;
    fetch(src).then((r) => r.text()).then((t) => {if (alive) setHtml(t);});
    return () => {alive = false;};
  }, [src]);
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#0c0c0f' }}
    dangerouslySetInnerHTML={{ __html: html }} />);

}

function MixedCarousel({ slides }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const multi = slides.length > 1;
  const go = (n) => setIdx((i) => (i + n + slides.length) % slides.length);
  React.useEffect(() => {
    if (!multi || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 15000);
    return () => clearInterval(t);
  }, [multi, paused, slides.length]);
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ ...accStyles.imgPlaceholder, padding: 0, background: 'var(--bg-2)', borderStyle: 'solid', borderColor: 'var(--line)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', width: `${slides.length * 100}%`, transform: `translateX(-${idx * (100 / slides.length)}%)`, transition: 'transform 520ms cubic-bezier(.2,.7,.2,1)' }}>
        {slides.map((s, i) =>
        <div key={i} style={{ width: `${100 / slides.length}%`, height: '100%', flexShrink: 0, position: 'relative', background: s.kind === 'embed' ? '#0c0c0f' : 'transparent' }}>
            {s.kind === 'embed' ?
          <InlineEmbed src={s.src} /> :
          <img src={s.src} alt={s.label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          }
          </div>
        )}
      </div>
      {multi &&
      <React.Fragment>
          <button onClick={(e) => {e.stopPropagation();go(-1);}} aria-label="Previous" style={carouselStyles.arrow(true)}>‹</button>
          <button onClick={(e) => {e.stopPropagation();go(1);}} aria-label="Next" style={carouselStyles.arrow(false)}>›</button>
          <div style={carouselStyles.dots}>
            {slides.map((_, i) =>
          <button key={i} onClick={(e) => {e.stopPropagation();setIdx(i);}} aria-label={`Go to slide ${i + 1}`} style={{ ...carouselStyles.dot, background: i === idx ? 'var(--ink)' : 'rgba(255,255,255,0.7)', border: i === idx ? '1px solid var(--ink)' : '1px solid rgba(0,0,0,0.15)' }} />
          )}
          </div>
        </React.Fragment>
      }
    </div>);

}

function ImagePlaceholder({ label, src, srcs }) {
  const list = Array.isArray(srcs) && srcs.length ? srcs : src ? [src] : null;
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (!list || list.length <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % list.length), 15000);
    return () => clearInterval(t);
  }, [list, paused]);
  if (list) {
    const multi = list.length > 1;
    const go = (n) => setIdx((i) => (i + n + list.length) % list.length);
    return (
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ ...accStyles.imgPlaceholder, padding: 0, background: 'var(--bg-2)', borderStyle: 'solid', borderColor: 'var(--line)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', width: `${list.length * 100}%`, transform: `translateX(-${idx * (100 / list.length)}%)`, transition: 'transform 520ms cubic-bezier(.2,.7,.2,1)' }}>
          {list.map((s, i) =>
          <img key={i} src={s} alt={label} style={{ width: `${100 / list.length}%`, height: '100%', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
          )}
        </div>
        {multi &&
        <React.Fragment>
            <button onClick={(e) => {e.stopPropagation();go(-1);}} aria-label="Previous" style={carouselStyles.arrow(true)}>‹</button>
            <button onClick={(e) => {e.stopPropagation();go(1);}} aria-label="Next" style={carouselStyles.arrow(false)}>›</button>
            <div style={carouselStyles.dots}>
              {list.map((_, i) =>
            <button key={i} onClick={(e) => {e.stopPropagation();setIdx(i);}} aria-label={`Go to slide ${i + 1}`} style={{ ...carouselStyles.dot, background: i === idx ? 'var(--ink)' : 'rgba(255,255,255,0.7)', border: i === idx ? '1px solid var(--ink)' : '1px solid rgba(0,0,0,0.15)' }} />
            )}
            </div>
          </React.Fragment>
        }
      </div>);

  }
  return (
    <div style={accStyles.imgPlaceholder}>
      <span>[ {label} ]<br /><span style={{ color: 'var(--muted-2)', fontSize: 9, letterSpacing: '0.1em' }}>swap with real image</span></span>
    </div>);

}

const carouselStyles = {
  arrow: (left) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [left ? 'left' : 'right']: 12,
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.08)',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(6px)',
    color: 'var(--ink)',
    fontSize: 22,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    padding: 0,
    fontFamily: 'inherit'
  }),
  dots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: 6
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    padding: 0,
    cursor: 'pointer'
  }
};

function AccordionItem({ idx, item, open, onToggle, last }) {
  const innerRef = React.useRef(null);
  const itemRef = React.useRef(null);

  // When this item opens, smooth-scroll its header into view (just below the sticky nav).
  // We wait for the expand transition to finish so the layout is stable before scrolling.
  const wasOpen = React.useRef(open);
  React.useEffect(() => {
    if (open && !wasOpen.current && itemRef.current) {
      const el = itemRef.current;
      const scrollToHeader = () => {
        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.top - 96;
        window.scrollTo({ top, behavior: 'smooth' });
      };
      // Grid-row transition is ~420ms; wait a touch longer so heights settle first.
      const t = setTimeout(scrollToHeader, 460);
      return () => clearTimeout(t);
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <div ref={itemRef} style={{ ...accStyles.item, ...(last ? accStyles.itemLast : {}) }} className="acc-item reveal">
      <button style={accStyles.header} onClick={onToggle} aria-expanded={open}
      className="acc-header"
      onMouseEnter={(e) => {e.currentTarget.style.paddingLeft = '8px';e.currentTarget.style.paddingRight = '8px';}}
      onMouseLeave={(e) => {e.currentTarget.style.paddingLeft = '0';e.currentTarget.style.paddingRight = '0';}}>
        <span style={accStyles.index}>{String(idx).padStart(2, '0')}</span>
        <span style={accStyles.tag}>{item.tag}</span>
        <span style={accStyles.headTitleWrap}>
          <h3 style={accStyles.headTitle}>{item.title}</h3>
          <span style={accStyles.headOrg}>{item.org}</span>
        </span>
        <span style={{
          ...accStyles.chevWrap,
          background: open ? 'var(--accent)' : 'transparent',
          borderColor: open ? 'var(--accent)' : 'var(--line-strong)',
          color: open ? '#fff' : 'var(--ink-2)'
        }}>
          <Chevron open={open} />
        </span>
      </button>

      <div style={{ ...accStyles.panel, gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div ref={innerRef} style={{ minHeight: 0, overflow: 'hidden' }}>
          <div style={accStyles.panelInner} className="acc-panel-inner">
            {item.left.kind === 'stat' ?
            <StatCard stats={item.left.stats} /> :
            item.left.kind === 'carousel' ?
            <MixedCarousel slides={item.left.slides} /> :
            item.left.kind === 'embed' ?
            <EmbedPlaceholder src={item.left.src} /> :
            <ImagePlaceholder label={item.left.label} src={item.left.src} srcs={item.left.srcs} />}
            <div style={accStyles.body}>
              <p style={accStyles.desc}>{item.desc}</p>
              {item.left.kind !== 'stat' && item.inlineStats &&
              <div style={accStyles.statsInline}>
                  {item.inlineStats.map((s, i) =>
                <div key={i}>
                      <div style={{ ...accStyles.inlineStatBig, ...(s.hl ? { color: 'var(--accent)' } : {}) }}>{s.n}</div>
                      <div style={accStyles.inlineStatLabel}>{s.l}</div>
                    </div>
                )}
                </div>
              }
              <div style={accStyles.pills}>
                {item.tags.map((t) => <span key={t} style={accStyles.pill}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

function Accordion({ startIdx }) {
  const items = [
  {
    tag: 'POSITIONING · BRAND STRATEGY',
    org: 'Watan Project · Founder',
    title: 'What does it take to get Ariana Grande to share your campaign to 300M+ followers? This.',
    left: { kind: 'carousel', slides: [
      { kind: 'image', src: 'assets/ariana-share.png', label: 'Ariana Grande Instagram story share' },
      { kind: 'image', src: 'assets/watan-campaigns-grid.png', label: 'Watan Project campaigns overview' }]
    },
    desc: 'Watan Project started as a response to something I saw growing up. Young Afghan-Americans had strong cultural identity but no clear way to turn that into action. I founded the nonprofit to change that, building the platform through content, campaigns, and community-driven fundraising focused on urgent needs in Afghanistan like food, water, and emergency relief. Early campaigns used simple, guerrilla marketing tactics that encouraged people to participate, share, and bring others in, allowing the movement to grow organically without paid media.\n\nAs momentum grew, so did the impact, scaling to a 6,000+ donor network, funding 8 large-scale projects, and raising $400K+ for families in crisis. At the peak of the 2021 Afghanistan crisis, the movement broke beyond the diaspora and was picked up by major platforms and media. Newsweek covered the campaign, we were interviewed by Globo News (the largest media group in Latin America), and @feminist featured Watan Project alongside leading global nonprofits. That momentum culminated in international pop star Ariana Grande sharing a giving guide that included Watan Project to her 300M+ audience, turning a grassroots movement into worldwide reach.\n\n$400K raised. 1000+ families aided. Real impact delivered. So that\u2019s how you get Ariana Grande to share your campaign with 300+ million people.',
    tags: ['Brand strategy', 'Positioning', 'Viral mechanics', 'Social media'],
    inlineStats: [
    { n: '$400K+', l: 'Raised', hl: true },
    { n: '20K', l: 'Followers' },
    { n: '8', l: 'Large-scale projects' },
    { n: '6K+', l: 'Donor network' }]

  },
  {
    tag: 'LIFECYCLE · EXPERIMENTATION',
    org: 'Orange County United Way · Marketing Manager',
    title: 'I made people actually open nonprofit e-blasts...and visit the website.',
    left: { kind: 'carousel', slides: [
      { kind: 'image', src: 'assets/eblast-ab-tests.png', label: 'Lifecycle email A/B testing' },
      { kind: 'image', src: 'assets/ocuw-homepage.png', label: 'OC United Way homepage' }]
    },
    desc: 'I inherited an email campaign workflow sitting at a 17.3% open rate, the nonprofit industry baseline, and a website that hadn\u2019t been treated as a growth channel in years. I spent the year testing what most teams don\u2019t: subject lines, send times by donor segment, content length, and CTA placement. I tied SEO directly to the donor topics that converted, and kept campaign content fresh instead of letting it go stale between cycles. By year-end, open rate doubled to 36.6% and held. Site traffic increased 150% YoY. The result of disciplined experimentation and consistently executing what worked.',
    inlineStats: [
    { n: '2×', l: 'Email open rate', hl: true },
    { n: '+150%', l: 'Web traffic YoY' },
    { n: '17.3 → 36.6%', l: 'Open rate, sustained' },
    { n: 'Email + Web + SEO', l: 'Owned end to end' }],

    tags: ['Lifecycle email', 'A/B testing', 'SEO', 'Content refresh', 'WordPress']
  },
  {
    tag: 'CONTENT STRATEGY · AUDIENCE GROWTH',
    org: 'Tustin Chamber of Commerce · Marketing Lead',
    title: 'Engagement isn’t just a metric. It’s a conversation. 715% growth proved it.',
    left: { kind: 'image', label: 'Tustin Chamber media', src: 'assets/tustin-growth.png' },
    desc: 'This organization\u2019s social presence performed like a bulletin board. Event flyers and announcements with minimal engagement. The fix wasn\u2019t better flyers. I shifted the strategy from broadcasting at the audience to actually showing up for them: replying to comments, spotlighting members, turning local business owners into characters worth following. The content started feeling like a community instead of a press release. Audience grew 715%.\n',
    inlineStats: [
    { n: '715%', l: 'Audience growth', hl: true },
    { n: 'Multi-channel', l: 'Execution' }],

    tags: ['Content strategy', 'Positioning', 'Audience growth', 'Brand']
  },
  {
    tag: 'BRANDING · DESIGN',
    org: 'Orange County United Way · Marketing Manager',
    title: 'This is not your grandmother’s United Way. It’s better.',
    left: { kind: 'image', label: 'OC Way collateral', srcs: ['assets/oc-way-annual-report.png', 'assets/oc-way-book.png'] },
    desc: 'Orange County United Way has been around since 1924. In 2025, it rebranded from the ground up, and I was inside it. My job was building the collateral that had to carry a century-old organization’s new identity into rooms full of decision-makers: C-suite executives, major donors, and corporate partners who still pictured the old logo and a donation tin. Letterpress invitations, gold foil, premium print. Pitch decks that led with impact data, not the usual nonprofit playbook. Branded reports that partners actually kept. Every piece was designed for an audience that judges credibility by design quality before they read a single word. A hundred years of history, finally dressed for the room it deserved to be in.\n',
    inlineStats: [
    { n: 'Est. 1924', l: 'Legacy organization' },
    { n: '2025', l: 'Full rebrand', hl: true },
    { n: 'C-suite', l: 'Audience' },
    { n: 'Credibility', l: 'By design' }],

    tags: ['Corporate partnerships', 'Rebrand', 'Messaging', 'Design']
  },
  {
    tag: 'LIVE PROGRAMMING · CROSS-FUNCTIONAL',
    org: 'Orange County United Way · Marketing Manager',
    title: 'Nobody asked for a live conversation series. We built one anyway.',
    left: { kind: 'image', label: 'Cultures United: A Conversation Series', src: 'assets/cultures-united.png' },
    desc: 'Cultures United started as a quarterly live-streamed conversation series with no audience and no playbook. Over two years I owned every part of it: guest curation, run-of-show, promotion, and post-event review each cycle. The growth wasn\u2019t luck. I A/B tested reminder sequences to get more people to actually show up, moved platforms when the numbers told me to, got panelists to promote to their own audiences, and tightened the email and editorial strategy every quarter. As a result viewership grew by 30% and held. Not a spike, a sustained lift built through testing and compounding small improvements over time.',
    inlineStats: [
    { n: '+30%', l: 'Viewership', hl: true },
    { n: '4×', l: 'Cycles per year' },
    { n: 'End-to-end', l: 'Ownership' },
    { n: 'Cross-channel', l: 'Promotion' }],

    tags: ['Live', 'Production', 'Cross-functional']
  },
  {
    tag: 'TECHNICAL FLUENCY · OUTBOUND',
    org: 'Stardog · Account Development Representative',
    title: 'When the product needs a translator, be the translator.',
    left: { kind: 'image', label: 'Stardog outbound sequence', src: 'assets/stardog-pipeline.png' },
    desc: 'Spent a chapter learning the tech-sales motion from the inside — graph data, semantic search, and outbound to engineers and data leaders. Built fluency in the way technical buyers evaluate, then carried that vocabulary back into marketing work that speaks to both sides of the table.',
    inlineStats: [
    { n: '40+', l: 'Daily qualified leads', hl: true },
    { n: 'SQL', l: 'Hands-on' },
    { n: 'Enterprise', l: 'Buyer profile' }],

    tags: ['Outbound', 'SQL', 'AI', 'Knowledge graphs']
  }];


  const [openIdx, setOpenIdx] = React.useState(0);

  return (
    <div style={accStyles.list}>
      {items.map((it, i) =>
      <AccordionItem
        key={i}
        idx={startIdx + i + 1}
        item={it}
        open={openIdx === i}
        onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
        last={i === items.length - 1} />

      )}

      <style>{`
        @media (max-width: 860px) {
          .acc-header { grid-template-columns: 40px 1fr auto !important; }
          .acc-header > :nth-child(2) { display: none; }
          .acc-panel-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>);

}