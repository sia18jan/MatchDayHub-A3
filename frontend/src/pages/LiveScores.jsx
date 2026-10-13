import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LiveScores() {
  const navigate = useNavigate()
  const [fixture, setFixture] = useState(null)
const [loading, setLoading] = useState(true)

  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)

useEffect(() => {
  fetch('https://matchdayhub-api.onrender.com/api/fixtures/latest')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not load fixture')
      }

      return response.json()
    })
    .then((data) => {
      setFixture(data.fixture)
      setHomeScore(data.fixture.home_score)
      setAwayScore(data.fixture.away_score)
      setLoading(false)
    })
    .catch((error) => {
      alert(error.message)
      setLoading(false)
    })
}, [])

  function decreaseHomeScore() {
    setHomeScore((score) => Math.max(0, score - 1))
  }

  function decreaseAwayScore() {
    setAwayScore((score) => Math.max(0, score - 1))
  }

async function submitScore() {
  try {
    const response = await fetch(
      `https://matchdayhub-api.onrender.com/api/fixtures/${fixture.id}/score`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          home_score: homeScore,
          away_score: awayScore,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Could not update score')
    }

    navigate('/confirmation', {
      state: {
        fixture: data.fixture,
      },
    })
  } catch (error) {
    alert(error.message)
  }
}

if (loading) {
  return (
    <main className="app-page">
      <div className="app-container">
        <p>Loading fixture...</p>
      </div>
    </main>
  )
}

if (!fixture) {
  return (
    <main className="app-page">
      <div className="app-container">
        <p>No fixture found.</p>
      </div>
    </main>
  )
}
  return (
    <main className="app-page">
      <div className="app-container">
        <p className="brand">⚽ MatchDay Hub</p>

        <h1 className="page-title">Live Scores</h1>

        <p className="page-description">
          Update the score quickly from the sideline.
        </p>

        <div className="scoreboard">
          <div className="card score-card">
            <p className="team-label">Home Team</p>
            <h2>{fixture.home_team}</h2>

            <p className="score-number">{homeScore}</p>

            <div className="score-controls">
              <button
                className="score-button"
                onClick={decreaseHomeScore}
                aria-label="Decrease Lions FC score"
              >
                −
              </button>

              <button
                className="score-button score-add"
                onClick={() => setHomeScore((score) => score + 1)}
                aria-label="Increase Lions FC score"
              >
                +
              </button>
            </div>
          </div>

          <div className="versus">VS</div>

          <div className="card score-card">
            <p className="team-label">Away Team</p>
            <h2>{fixture.away_team}</h2>
            <p className="score-number">{awayScore}</p>

            <div className="score-controls">
              <button
                className="score-button"
                onClick={decreaseAwayScore}
                aria-label="Decrease Tigers FC score"
              >
                −
              </button>

              <button
                className="score-button score-add"
                onClick={() => setAwayScore((score) => score + 1)}
                aria-label="Increase Tigers FC score"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="score-actions">
          <button
            className="primary-button"
            onClick={submitScore}
          >
            Submit Final Score
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  )
}

export default LiveScores