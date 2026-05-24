// Capabilities marquee — slow horizontal scroll separating hero from metrics

const marqueeStyles = {
  wrap: {
    position: 'relative',
    padding: '28px 0',
    borderTop: '1px solid var(--line)',
    borderBottom: '1px solid var(--line)',
    overflow: 'hidden',
    background: 'var(--bg)'
  },
  track: {
    display: 'flex',
    gap: 56,
    width: 'max-content',
    animation: 'marquee 50s linear infinite',
    whiteSpace: 'nowrap'
  },
  item: {
    display: 'inline-flex', alignItems: 'center', gap: 18,
    fontFamily: 'var(--serif)',
    fontStyle: 'italic',
    fontSize: 'clamp(24px, 3.8vw, 44px)',
    color: 'var(--ink)',
    letterSpacing: '-0.02em'
  },
  dot: {
    width: 8, height: 8, borderRadius: 8, background: 'var(--accent)'
  }
};

function Marquee() {
  const items = [
  'Campaign Strategy',
  'Go-to-Market',
  'Brand Storytelling',
  'Lifecycle Marketing',
  'Project Management',
  'Content Strategy',
  'Growth Marketing',
  'Marketing Analytics',
  'A/B Testing',
  'SEO'];

  const loop = [...items, ...items];

  return (
    <div style={marqueeStyles.wrap}>
      <div style={marqueeStyles.track}>
        {loop.map((it, i) =>
        <span key={i} style={marqueeStyles.item}>
            {it}
            <span style={marqueeStyles.dot}></span>
          </span>
        )}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>);

}