import { Link } from 'react-router'

export const Home = () => (
  <main>
    <span className="tag">2026 NFL Draft</span>
    <h1>
      draft<br />
      duder<span className="dot">.</span>
    </h1>
    <p>
      You and your friends predict the first round of the 2026 NFL Draft.
      32 picks. 100 prospects. Score points for accuracy.{' '}
      <Link to="/about" className="inline-link">How scoring works →</Link>
    </p>

    <div className="card-grid">
      <Link to="/board" className="card card-link">
        <h3>Board</h3>
        <p>Browse the top 100 prospects.</p>
      </Link>
      <Link to="/about" className="card card-link">
        <h3>Scoring</h3>
        <p>7 pts max per slot. 224 max total.</p>
      </Link>
    </div>

    <div className="footer">v{__APP_VERSION__}</div>
  </main>
)
