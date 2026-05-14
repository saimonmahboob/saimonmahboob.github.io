// Top navigation — minimal, sticky, blurred-glass

const navStyles = {
  bar: {
    position: 'fixed', top: 0, left: 0, right: 0,
    zIndex: 50,
    padding: '14px max(20px, 4vw)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    backdropFilter: 'saturate(160%) blur(14px)',
    WebkitBackdropFilter: 'saturate(160%) blur(14px)',
    background: 'color-mix(in srgb, var(--bg) 70%, transparent)',
    borderBottom: '1px solid var(--line)',
    fontFamily: 'var(--sans)'
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em'
  },
  dot: {
    width: 8, height: 8, borderRadius: 8,
    background: 'var(--accent)',
    boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)'
  },
  links: {
    display: 'flex', gap: 28, alignItems: 'center',
    fontSize: 13, color: 'var(--muted)', letterSpacing: '0.01em'
  },
  link: {
    transition: 'color .2s', cursor: 'pointer'
  },
  cta: {
    fontSize: 13, fontWeight: 500,
    padding: '8px 14px',
    borderRadius: 999,
    background: 'var(--ink)', color: 'var(--bg)',
    border: 'none',
    letterSpacing: '0.01em',
    transition: 'transform .2s, background .2s'
  }
};

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' }];

  const [theme, setTheme] = React.useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  });
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('sm-theme', next); } catch(e) {}
  };

  return (
    <nav style={{
      ...navStyles.bar,
      borderBottomColor: scrolled ? 'var(--line)' : 'transparent',
      background: scrolled ? 'color-mix(in srgb, var(--bg) 78%, transparent)' : 'transparent'
    }}>
      <a href="#top" style={navStyles.brand}>
        <span className="nav-wordmark">Saimon Mahboob</span>
      </a>

      <div style={navStyles.links} className="nav-links">
        <span className="nav-status" style={{ opacity: "1", borderWidth: "1px" }}>
          <span className="status-dot"></span>
          <span>Open to work</span>
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          className="theme-toggle">
          <span className="theme-toggle-knob" data-theme={theme}>
            {theme === 'dark' ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            )}
          </span>
        </button>
        {items.map((i) =>
        <a key={i.id} href={`#${i.id}`} style={navStyles.link}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>
            {i.label}
          </a>
        )}
        <a href="#contact">
          <button style={navStyles.cta}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            Get in touch
          </button>
        </a>
      </div>

      <style>{`
        .nav-wordmark {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: var(--ink);
          line-height: 1;
          transition: opacity .2s;
          text-decoration: underline;
          text-decoration-color: var(--accent);
          text-decoration-thickness: 1.5px;
          text-underline-offset: 5px;
        }
        .nav-wordmark:hover { opacity: .7; }
        .nav-status {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--mono);
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-2);
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: color-mix(in srgb, var(--bg) 60%, transparent);
        }
        .theme-toggle {
          width: 30px; height: 30px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: color-mix(in srgb, var(--bg) 60%, transparent);
          color: var(--ink);
          padding: 0;
          transition: background .2s, border-color .2s, transform .2s;
        }
        .theme-toggle:hover {
          background: color-mix(in srgb, var(--ink) 6%, var(--bg));
          border-color: var(--line-strong);
        }
        .theme-toggle-knob {
          display: inline-flex; align-items: center; justify-content: center;
          transition: transform .35s cubic-bezier(.2,.7,.2,1);
        }
        .theme-toggle:hover .theme-toggle-knob { transform: rotate(20deg); }
        @media (max-width: 720px) {
          .nav-links a:not(:last-child) { display: none; }
          .nav-status { display: none; }
        }
      `}</style>
    </nav>);

}