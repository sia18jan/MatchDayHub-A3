import { useLocation, useNavigate } from 'react-router-dom'

function Confirmation() {
  const navigate = useNavigate()
const location = useLocation()
const fixture = location.state?.fixture

if (!fixture) {
  return (
    <main className="app-page confirmation-page">
      <div className="confirmation-container">
        <p className="brand">⚽ MatchDay Hub</p>

        <h1 className="page-title">No Result Available</h1>

        <p className="page-description">
          Submit a match score before viewing confirmation.
        </p>

        <button
          className="primary-button"
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </button>
      </div>
    </main>
  )
}

  return (
    <main className="app-page confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✓</div>

        <p className="brand">⚽ MatchDay Hub</p>

        <h1 className="page-title">Score Submitted</h1>

        <p className="page-description confirmation-text">
          The match result has been submitted successfully.
        </p>

        <div className="card result-summary">
          <p className="summary-label">FINAL SCORE</p>

          <div className="final-score">
            <div>
              <strong>{fixture.home_team}</strong>
<span>{fixture.home_score}</span>
            </div>

            <p>—</p>

            <div>
              <strong>{fixture.away_team}</strong>
<span>{fixture.away_score}</span>
            </div>
          </div>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </button>
      </div>
    </main>
  )
}

export default Confirmation