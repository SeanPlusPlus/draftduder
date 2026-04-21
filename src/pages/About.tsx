export const About = () => (
  <main>
    <span className="tag">About</span>
    <h1>
      What is<br />
      this<span className="dot">?</span>
    </h1>
    <p>
      A throwaway project that stuck around longer than expected. Nothing
      production, nothing serious — just a place to try things.
    </p>

    <div className="about-section">
      <h3 style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        Built with
      </h3>
      <ul className="stack-list">
        <li>React 19</li>
        <li>TypeScript</li>
        <li>Bun</li>
        <li>Vite</li>
        <li>React Router</li>
        <li>Biome</li>
        <li>Prettier</li>
      </ul>
    </div>

    <div className="footer">v{__APP_VERSION__}</div>
  </main>
)
