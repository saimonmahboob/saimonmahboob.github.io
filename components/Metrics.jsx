// Metrics — large numerals, the impact section
// Horizontal row of 4 equal stat cells

const metricsStyles = {
  wrap: {
    padding: 'clamp(80px, 12vh, 140px) max(20px, 4vw)',
    position: 'relative'
  },
  label: {
    fontFamily: 'var(--mono)',
    fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
    color: 'var(--muted)',
    marginBottom: 28,
    display: 'flex', alignItems: 'center', gap: 12
  },
  rule: {
    flex: 1, height: 1, background: 'var(--line)'
  },
  intro: {
    fontFamily: 'var(--serif)',
    fontWeight: 400,
    fontSize: 'clamp(36px, 5.5vw, 76px)',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    margin: 0,
    maxWidth: 1100,
    color: 'var(--ink)'
  },
  italic: { fontStyle: 'italic', color: 'var(--accent)' },
  grid: {
    marginTop: 'clamp(48px, 8vh, 88px)',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 0,
    border: '1px solid var(--line)',
    borderRadius: 4,
    overflow: 'hidden'
  },
  cell: {
    padding: 'clamp(24px, 2.6vw, 36px) clamp(20px, 2.4vw, 32px)',
    borderRight: '1px solid var(--line)',
    display: 'flex', flexDirection: 'column', gap: 14,
    minHeight: 260,
    background: 'var(--bg)'
  },
  num: {
    fontFamily: 'var(--serif)',
    fontWeight: 400,
    fontSize: 'clamp(48px, 5.6vw, 84px)',
    lineHeight: 0.95,
    letterSpacing: '-0.025em',
    color: 'var(--ink)',
    display: 'flex', alignItems: 'baseline'
  },
  suffix: {
    fontStyle: 'italic',
    color: 'var(--accent)',
    fontSize: '0.55em',
    marginLeft: 4
  },
  topLabel: {
    fontFamily: 'var(--mono)',
    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
    color: 'var(--muted)'
  },
  context: {
    fontSize: 13.5,
    lineHeight: 1.55,
    color: 'var(--ink-2)',
    marginTop: 'auto'
  },
  provenance: {
    fontFamily: 'var(--mono)',
    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--muted)',
    marginTop: 12,
    display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start'
  },
  org: {
    color: 'var(--accent)'
  },
  sep: {
    color: 'var(--muted-2)'
  }
};

function Counter({ to, prefix = '', suffix = '', duration = 1800, decimals = 0 }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(to * eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const display = decimals > 0 ?
    val.toFixed(decimals) :
    to >= 1000 ? Math.round(val).toLocaleString() : Math.round(val);
  return <span ref={ref}>{prefix}{display}</span>;
}

function Metrics() {
  const stats = [
    {
      num: 400, prefix: '$', suffix: 'K+',
      label: 'Total raised',
      context: 'Built and scaled a full-funnel digital fundraising system for a grassroots humanitarian organization.',
      org: 'Watan Project',
      period: '2019 — Present'
    },
    {
      num: 715, suffix: '%',
      label: 'Audience growth',
      context: 'Grew a social audience from a bulletin-style presence into a real engaged following.',
      org: 'Tustin Chamber',
      period: '2019 — 2020'
    },
    {
      num: 2, suffix: '×',
      label: 'Email open rate',
      context: 'Doubled email open rate YoY through send-strategy and A/B testing, 17.3% to 36.6%, sustained.',
      org: 'Orange County United Way',
      period: '2024 — Present'
    },
    {
      num: 150, prefix: '+', suffix: '%',
      label: 'Web traffic',
      context: 'Drove year-over-year site traffic growth through SEO, email campaigns, and content updates.',
      org: 'Orange County United Way',
      period: '2024 — Present'
    }
  ];

  const Cell = ({ data }) => (
    <div style={metricsStyles.cell} className="reveal metric-cell">
      <span style={metricsStyles.topLabel}>{data.label}</span>
      <div style={metricsStyles.num}>
        <Counter to={data.num} prefix={data.prefix || ''} duration={1800} />
        {data.suffix && <span style={metricsStyles.suffix}>{data.suffix}</span>}
      </div>
      <p style={metricsStyles.context}>{data.context}</p>
      <div style={metricsStyles.provenance}>
        <span style={metricsStyles.org}>{data.org}</span>
        <span>{data.period}</span>
      </div>
    </div>
  );

  return (
    <section style={metricsStyles.wrap}>
      <div style={metricsStyles.label} className="reveal">
        <span>(01)</span>
        <span>— THE NUMBERS</span>
        <span style={metricsStyles.rule}></span>
      </div>

      <h2 style={metricsStyles.intro} className="reveal" data-delay="1">
        The proof is in <span style={metricsStyles.italic}>the metrics.</span>
      </h2>

      <div style={metricsStyles.grid} className="metrics-grid">
        {stats.map((m, i) => <Cell key={i} data={m} />)}
      </div>

      <style>{`
        .metrics-grid > .metric-cell:last-child { border-right: none; }

        @media (max-width: 1000px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .metric-cell {
            border-right: 1px solid var(--line) !important;
            border-bottom: 1px solid var(--line) !important;
          }
          .metric-cell:nth-child(2n) { border-right: none !important; }
          .metric-cell:nth-last-child(-n+2) { border-bottom: none !important; }
        }
        @media (max-width: 600px) {
          .metrics-grid { grid-template-columns: 1fr !important; }
          .metric-cell { border-right: none !important; }
          .metric-cell:nth-child(2n) { border-right: none !important; }
        }
      `}</style>
    </section>
  );
}
