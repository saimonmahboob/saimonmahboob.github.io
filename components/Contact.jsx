// Contact — large CTA block

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
  return (
    <section id="contact" style={contactStyles.wrap}>
      <div style={contactStyles.inner}>
        <div style={contactStyles.eyebrow} className="reveal">
          <span style={contactStyles.rule}></span>
          <span>05 / Get in touch</span>
        </div>
        <h2 style={contactStyles.big} className="reveal" data-delay="1">
          Let's <span style={contactStyles.italic}>build</span><br/>something.
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
            <span style={contactStyles.detailValue}>Growth & product marketing roles in tech</span>
          </div>
          <div style={contactStyles.detail}>
            <span style={contactStyles.detailLabel}>Availability</span>
            <span style={contactStyles.detailValue}>Open to conversations</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .contact-details { flex-direction: column !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
