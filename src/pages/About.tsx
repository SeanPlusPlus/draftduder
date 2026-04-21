export const About = () => (
  <main>
    <span className="tag">How it works</span>
    <h1>
      Scoring<span className="dot">.</span>
    </h1>

    <p>
      Each player predicts the 2026 NFL Draft first round. Pick 1 prospect for
      each of the 32 slots from a universe of 100 players. As each pick comes
      in live, your slots score in realtime.
    </p>

    <div className="scoring-table">
      <table>
        <thead>
          <tr>
            <th>Points</th>
            <th>What happened</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>7</td><td>Nailed it — right guy, right slot</td></tr>
          <tr><td>6</td><td>Off by 1</td></tr>
          <tr><td>5</td><td>Off by 2</td></tr>
          <tr><td>4</td><td>Off by 3</td></tr>
          <tr><td>3</td><td>Off by 4</td></tr>
          <tr><td>2</td><td>Off by 5</td></tr>
          <tr><td>1</td><td>Off by 6</td></tr>
          <tr><td>0</td><td>Off by 7+ or guy didn't go in round 1</td></tr>
        </tbody>
      </table>
    </div>

    <div className="about-section">
      <p><strong>Max score:</strong> 224 (7 × 32)</p>
      <p><strong>Min score:</strong> 0</p>
      <p>Highest score wins.</p>
    </div>

    <div className="footer">
      v{__APP_VERSION__} — no more squared penalties, no more bickering about algos.
      we kept it simple this year.
    </div>
  </main>
)
