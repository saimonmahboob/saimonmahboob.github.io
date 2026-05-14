// About — two-column: paragraphs left, large quote anchored right

const aboutStyles = {
  wrap: { padding: 'clamp(80px, 12vh, 140px) max(20px, 4vw)', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' },
  inner: { maxWidth: 1240, margin: '0 auto' },
  eyebrow: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 },
  rule: { width: 24, height: 1, background: 'var(--muted-2)' },

  lead: {
    fontFamily: 'var(--serif)', fontWeight: 400,
    fontSize: 'clamp(24px, 2.9vw, 37px)', lineHeight: 1.22, letterSpacing: '-0.02em',
    margin: '0 0 56px 0', color: 'var(--ink)',
    maxWidth: 920
  },
  italic: { fontStyle: 'italic', color: 'var(--accent)' },

  // Two-column row: text left, quote right
  row: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 'clamp(48px, 7vw, 96px)',
    alignItems: 'flex-start'
  },

  body: { display: 'flex', flexDirection: 'column', gap: 28 },
  para: {
    fontFamily: 'var(--serif)', fontWeight: 400,
    fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.55, letterSpacing: '-0.005em',
    margin: 0, color: 'var(--ink-2)'
  },

  quoteWrap: {
    position: 'sticky', top: 'clamp(40px, 10vh, 120px)',
    paddingLeft: 'clamp(20px, 2.5vw, 32px)',
    borderLeft: '2px solid var(--accent)',
    display: 'flex', flexDirection: 'column', gap: 20
  },
  quoteEyebrow: {
    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--muted)'
  },
  quoteText: {
    fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
    fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.25, letterSpacing: '-0.018em',
    color: 'var(--ink)', margin: 0
  },
  quoteCite: {
    display: 'flex', alignItems: 'center', gap: 12,
    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: 'var(--muted)'
  },
  citeRule: { width: 20, height: 1, background: 'var(--muted-2)' }
};

function About() {
  return (
    <section id="about" style={aboutStyles.wrap}>
      <div style={aboutStyles.inner}>
        <div className="reveal">
          <div style={aboutStyles.eyebrow}>
            <span style={aboutStyles.rule}></span>
            <span>04 / About</span>
          </div>
          <p style={aboutStyles.lead}>
            Saimon Mahboob — seven years in <span style={aboutStyles.italic}>marketing</span>, currently leading programs at <span style={aboutStyles.italic}>Orange County United Way</span>, and looking for what comes next in tech.
          </p>
        </div>

        <div style={aboutStyles.row} className="about-row">
          <div className="reveal" style={aboutStyles.body} data-delay="2">
            <p style={aboutStyles.para}>
              I've led go-to-market strategy across multiple campaigns and organizations, scaling audiences, increasing engagement, and driving over <span style={aboutStyles.italic}>$400K in revenue</span> through digital-first initiatives.
            </p>
            <p style={aboutStyles.para}>
              I'm particularly interested in how marketing is evolving alongside product and data, where growth is driven not just by campaigns, but by <span style={aboutStyles.italic}>systems, experimentation, and technical fluency</span>.
            </p>
            <p style={aboutStyles.para}>
              Outside of work, I’m usually planning trips, trying out new AI tools, or getting way too invested in whatever I’ve randomly decided to learn that week.
            </p>
          </div>

          <figure className="reveal about-quote" style={aboutStyles.quoteWrap} data-delay="3">
            <span style={aboutStyles.quoteEyebrow}>My favorite marketing quote</span>
            <p style={aboutStyles.quoteText}>
              “Positioning is what you do to the mind of the prospect.”
            </p>
            <figcaption style={aboutStyles.quoteCite}>
              <span style={aboutStyles.citeRule}></span>
              <span>Al Ries · Positioning</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .about-row { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-quote { position: static !important; }
        }
      `}</style>
    </section>);

}