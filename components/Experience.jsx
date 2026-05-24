// Experience — career timeline

const expStyles = {
  wrap: { padding: 'clamp(80px, 12vh, 140px) max(20px, 4vw)' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 56 },
  eyebrow: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 },
  rule: { width: 24, height: 1, background: 'var(--muted-2)' },
  title: { fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(40px, 5.5vw, 76px)', lineHeight: 1, letterSpacing: '-0.025em', margin: 0, color: 'var(--ink)' },
  italic: { fontStyle: 'italic', color: 'var(--accent)' },
  list: { display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' },
  row: {
    display: 'grid',
    gridTemplateColumns: '160px 1fr 1.4fr',
    gap: 'clamp(20px, 3vw, 48px)',
    padding: '32px 0',
    borderBottom: '1px solid var(--line)',
    alignItems: 'flex-start',
    cursor: 'pointer',
    transition: 'background .25s, padding .25s'
  },
  year: {
    fontFamily: 'var(--mono)',
    fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--muted)',
    paddingTop: 6,
    position: 'relative',
    paddingLeft: 22
  },
  yearDot: {
    position: 'absolute',
    left: 3,
    top: 10,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--accent)',
    boxShadow: '0 0 0 3px var(--bg)',
    zIndex: 1
  },
  role: { display: 'flex', flexDirection: 'column', gap: 6 },
  roleTitle: { fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2vw, 26px)', letterSpacing: '-0.01em', margin: 0, color: 'var(--ink)', fontWeight: 400 },
  org: { fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.06em' },
  desc: { fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 },
  pills: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 },
  pill: { padding: '4px 9px', borderRadius: 999, border: '1px solid var(--line)', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.04em' },
  stackWrap: { marginTop: 'clamp(64px, 9vh, 96px)' },
  stackHeadRow: { display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 32 },
  stackEyebrow: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
  stackTitle: { fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(40px, 5.5vw, 76px)', lineHeight: 1, letterSpacing: '-0.025em', margin: 0, color: 'var(--ink)' },
  stackRowYear: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 6 },
  stackRowName: { fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2vw, 26px)', letterSpacing: '-0.01em', margin: 0, color: 'var(--ink)', fontWeight: 400 },
  stackRowKind: { fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.06em', marginTop: 6, display: 'block' }
};

function Experience() {
  const stack = [
  { kind: 'Category', label: 'Campaign & email', tools: ['Mailchimp', 'HubSpot'] },
  { kind: 'Category', label: 'CRM & enablement', tools: ['Salesforce', 'ZoomInfo', 'LinkedIn Sales Navigator'] },
  { kind: 'Category', label: 'Project & productivity', tools: ['Asana', 'Notion', 'Claude', 'ChatGPT'] },
  { kind: 'Category', label: 'Design', tools: ['Canva', 'Adobe Creative Cloud'] },
  { kind: 'Category', label: 'Analytics & data', tools: ['Google Analytics', 'Excel', 'Tableau'] }];

  const items = [
  { year: '2024 — Now', role: 'Marketing Manager', org: 'Orange County United Way', desc: 'Coordinating internal creative teams and agency partners across the organization\u2019s largest fundraising and engagement programs across email, social, paid, and print, owning campaign strategy from brief through delivery.', pills: ['Campaign strategy', 'Creative team', 'Agency partnerships', 'Fundraising programs'] },
  { year: '2022 — 2023', role: 'Account Development Representative', org: 'Stardog', desc: 'B2B SaaS sales role at an enterprise data and AI platform, building pipeline and running outbound outreach to technical decision-makers across data engineering and analytics organizations.', pills: ['Positioning', 'B2B', 'Enterprise', 'SQL'] },
  { year: '2019 — Now', role: 'Founder', org: 'Watan Project', desc: 'Founded a digital-first nonprofit and scaled it to a 6,000+ donor base and 20K+ followers, through audience positioning, viral campaign mechanics, and strategic partnerships. $400K raised across 8 large-scale projects.', pills: ['Brand', 'Positioning', 'Fundraising', 'Community'] },
  { year: '2019 — 2020', role: 'Marketing Lead', org: 'Tustin Chamber of Commerce', desc: 'Led all marketing operations for a regional business membership organization, managing digital channels, content production, and promotional campaigns across a diverse portfolio of local businesses and community events.', pills: ['Social', 'Content', 'Community'] },
  { year: '2018 — 2022', role: 'B.S. Business Administration, Marketing', org: 'UC Riverside', desc: 'Cum Laude. GPA 3.77. Chancellor\u2019s Honor List. Marketing fundamentals built through workshop-style coursework in strategy, brand management, consumer behavior, and research methods.', pills: ['Education'] }];

  return (
    <section id="experience" style={expStyles.wrap}>
      <div style={expStyles.head}>
        <div className="reveal">
          <div style={expStyles.eyebrow}>
            <span style={expStyles.rule}></span>
            <span>03 / Track record</span>
          </div>
          <h2 style={expStyles.title}>The <span style={expStyles.italic}>resume</span>, abridged.</h2>
        </div>
      </div>
      <div style={{ ...expStyles.list, position: 'relative' }} className="exp-list">
        {items.map((it, i) =>
        <div key={i} style={expStyles.row} className="exp-row reveal" data-delay={Math.min(i + 1, 6)}>
            <div style={expStyles.year} className="exp-year">
              <span style={expStyles.yearDot} className="exp-year-dot"></span>
              {it.year}
            </div>
            <div style={expStyles.role}>
              <h3 style={expStyles.roleTitle}>{it.role}</h3>
              <span style={expStyles.org}>{it.org}</span>
            </div>
            <div style={{ paddingLeft: 'clamp(16px, 2vw, 28px)', borderLeft: '1px solid var(--line-strong)', alignSelf: 'stretch' }} className="exp-desc">
              <p style={expStyles.desc}>{it.desc}</p>
              <div style={expStyles.pills}>
                {it.pills.map((p) => <span key={p} style={expStyles.pill}>{p}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={expStyles.stackWrap}>
        <div className="reveal">
          <div style={expStyles.stackEyebrow}>
            <span style={expStyles.rule}></span>
            <span>Tool stack</span>
          </div>
          <h3 style={expStyles.stackTitle}>What I <span style={expStyles.italic}>work in</span>.</h3>
        </div>
        <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--line)' }} className="stack-cols reveal">
          {stack.map((row, i) =>
          <div key={row.label} className="stack-col" style={{
            display: 'flex', flexDirection: 'column', gap: 14,
            paddingRight: 'clamp(16px, 2vw, 24px)'
          }}>
              <div style={{
              fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--muted)',
              paddingBottom: 14, borderBottom: '1px solid var(--line)'
            }}>{row.label}</div>
              <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: 10, fontSize: "24px"
            }}>
                {row.tools.map((t) =>
              <li key={t} style={{
                fontFamily: 'var(--serif)', fontSize: 24, lineHeight: 1.4,
                color: 'var(--ink)', letterSpacing: '-0.01em'
              }}>{t}</li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .exp-list::before {
          content: '';
          position: absolute;
          left: 6.5px;
          top: 12px;
          bottom: 12px;
          width: 0;
          border-left: 1.5px dotted var(--muted-2);
          pointer-events: none;
        }
        .exp-row:hover { background: var(--bg-2); padding-left: 12px; padding-right: 12px; }
        .exp-row .exp-desc { transition: border-color .25s ease; }
        .exp-row:hover .exp-desc { border-left-color: var(--accent); }
        .stack-cols { display: grid; grid-template-columns: repeat(5, 1fr); gap: clamp(20px, 3vw, 40px); }
        @media (max-width: 720px) {
          .exp-list::before { display: none !important; }
          .exp-row { grid-template-columns: 1fr !important; gap: 10px !important; }
          .exp-row .exp-desc { border-left: none !important; padding-left: 0 !important; }
          .exp-row .exp-year { padding-left: 0 !important; }
          .exp-row .exp-year .exp-year-dot { display: none !important; }
          .stack-cols { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .stack-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>);

}