export const Home = () => (
  <main>
    <span className="tag">v0.0.1</span>
    <h1>
      draft<br />
      duder<span className="dot">.</span>
    </h1>
    <p>
      A scratch pad for ideas that probably won't survive the weekend. Built
      with whatever felt right at the time.
    </p>

    <div className="card-grid">
      <div className="card">
        <h3>Stack</h3>
        <p>React, TypeScript, Bun, Vite. No opinions about state management yet.</p>
      </div>
      <div className="card">
        <h3>Status</h3>
        <p>Exists. Runs. Tests pass. That's the bar for now.</p>
      </div>
    </div>

    <div className="footer">built for no particular reason</div>
  </main>
)
