// Footer — minimal sign-off

const footerStyles = {
  wrap: { padding: '32px max(20px, 4vw)', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' },
  link: { color: 'var(--ink-2)', transition: 'color .2s' },
};

function Footer() {
  return (
    <footer style={footerStyles.wrap}>
      <span>© {new Date().getFullYear()} Saimon Mahboob</span>
      <a href="mailto:mahboobsaimon@gmail.com" style={footerStyles.link}>mahboobsaimon@gmail.com</a>
    </footer>
  );
}
