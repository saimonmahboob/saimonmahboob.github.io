// Main app — assembles sections + scroll reveals + tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2f4bff",
  "headline": "I *build* marketing that earns its budget back.",
  "showGrain": true,
  "background": "pure",
  "serif": "sans",
  "underline": "brush",
  "headlineFlare": "underline",
  "perWordRise": true,
  "intro": "showcase"
}/*EDITMODE-END*/;

const SERIF_STACKS = {
  instrument: '"Instrument Serif", "Times New Roman", serif',
  fraunces: '"Fraunces", "Times New Roman", serif',
  source: '"Source Serif 4", "Source Serif Pro", Georgia, serif',
  newsreader: '"Newsreader", Georgia, serif',
  sans: '"Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply CSS vars from tweaks
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', tweaks.accent);
    // tonal accent-soft
    r.style.setProperty('--accent-soft', mixWithWhite(tweaks.accent, 0.92));
    document.body.classList.toggle('grain', !!tweaks.showGrain);

    // Serif tweak — swap the --serif CSS var (or fall back to sans entirely)
    const stack = SERIF_STACKS[tweaks.serif] || SERIF_STACKS.instrument;
    r.style.setProperty('--serif', stack);

    // Don't override --bg/--bg-2 when dark mode is active — let the
    // html[data-theme="dark"] rule provide them. Background tweak is a light-mode-only choice.
    const apply = () => {
      const isDark = r.getAttribute('data-theme') === 'dark';
      if (isDark) {
        r.style.removeProperty('--bg');
        r.style.removeProperty('--bg-2');
        return;
      }
      if (tweaks.background === 'warm') {
        r.style.setProperty('--bg', '#f6f5f1');
        r.style.setProperty('--bg-2', '#ecebe5');
      } else if (tweaks.background === 'cool') {
        r.style.setProperty('--bg', '#f3f5f8');
        r.style.setProperty('--bg-2', '#e7ebf1');
      } else {
        r.style.setProperty('--bg', '#ffffff');
        r.style.setProperty('--bg-2', '#f1f1ee');
      }
    };
    apply();

    // Re-apply when theme attribute toggles
    const obs = new MutationObserver(apply);
    obs.observe(r, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [tweaks]);

  // Reveal handled via pure CSS animation (no JS observer needed).

  return (
    <>
      <Nav headline={tweaks.headline} />
      <Hero headline={tweaks.headline} flare={tweaks.headlineFlare} perWordRise={tweaks.perWordRise} underline={tweaks.underline} intro={tweaks.intro} />
      <Marquee />
      <Metrics />
      <Work />
      <Experience />
      <About />
      <Contact underline={tweaks.underline} />
      <Footer />
      <TweaksUI tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

function mixWithWhite(hex, t) {
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  const mr = Math.round(r + (255-r)*t);
  const mg = Math.round(g + (255-g)*t);
  const mb = Math.round(b + (255-b)*t);
  return `rgb(${mr},${mg},${mb})`;
}

function TweaksUI({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Identity">
        <TweakText label="Headline" value={tweaks.headline} onChange={v => setTweak('headline', v)} />
      </TweakSection>
      <TweakSection title="Color">
        <TweakColor label="Accent" value={tweaks.accent} onChange={v => setTweak('accent', v)} />
        <TweakRadio
          label="Background"
          value={tweaks.background}
          options={[
            { value: 'warm', label: 'Warm' },
            { value: 'cool', label: 'Cool' },
            { value: 'pure', label: 'Pure' },
          ]}
          onChange={v => setTweak('background', v)}
        />
      </TweakSection>
      <TweakSection title="Typography">
        <TweakSelect
          label="Serif"
          value={tweaks.serif}
          options={[
            { value: 'instrument', label: 'Instrument Serif (current)' },
            { value: 'fraunces', label: 'Fraunces' },
            { value: 'source', label: 'Source Serif 4' },
            { value: 'newsreader', label: 'Newsreader' },
            { value: 'sans', label: 'Drop serif (sans only)' },
          ]}
          onChange={v => setTweak('serif', v)}
        />
      </TweakSection>
      <TweakSection title="Headline flare">
        <TweakSelect
          label="Intro effect"
          value={tweaks.intro}
          options={[
            { value: 'off', label: 'Off' },
            { value: 'showcase', label: 'Showcase (name + manifesto)' },
            { value: 'choreographed', label: 'Choreographed (subtle)' },
            { value: 'bold', label: 'Bold pre-roll panel' },
            { value: 'manifesto', label: 'Manifesto (word-by-word)' },
            { value: 'name-takeover', label: 'Name takeover' },
            { value: 'portrait-takeover', label: 'Portrait takeover' },
            { value: 'curtain', label: 'Curtain + brush paint' },
          ]}
          onChange={v => setTweak('intro', v)}
        />
        <TweakSelect
          label="Effect on ‘back.’"
          value={tweaks.headlineFlare}
          options={[
            { value: 'none', label: 'None' },
            { value: 'underline', label: 'Underline mark' },
            { value: 'ledger', label: 'Ledger underline' },
            { value: 'boomerang', label: 'Boomerang slide-in' },
          ]}
          onChange={v => setTweak('headlineFlare', v)}
        />
        <TweakToggle label="Per-word rise reveal" value={tweaks.perWordRise} onChange={v => setTweak('perWordRise', v)} />
      </TweakSection>
      <TweakSection title="Underline style">
        <TweakSelect
          label="Mark (hero + contact)"
          value={tweaks.underline}
          options={[
            { value: 'marker', label: 'Marker (sharpie)' },
            { value: 'brush', label: 'Brushstroke' },
            { value: 'highlighter', label: 'Highlighter' },
            { value: 'double', label: 'Double line' },
            { value: 'scribble', label: 'Scribble' },
            { value: 'squiggle', label: 'Squiggle' },
            { value: 'none', label: 'None' },
          ]}
          onChange={v => setTweak('underline', v)}
        />
      </TweakSection>
      <TweakSection title="Texture">
        <TweakToggle label="Paper grain" value={tweaks.showGrain} onChange={v => setTweak('showGrain', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
