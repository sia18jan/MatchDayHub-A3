import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ScheduleBuilder() {
  const navigate = useNavigate()

  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [field, setField] = useState('Field 1')
  const [matchTime, setMatchTime] = useState('')

  async function handleSubmit(event) {
  event.preventDefault()

  try {
    const response = await fetch('http://127.0.0.1:5000/api/fixtures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        home_team: homeTeam,
        away_team: awayTeam,
        field: field,
        match_time: matchTime,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Could not create fixture')
    }

    navigate('/scores')
  } catch (error) {
    alert(error.message)
  }
}

  return (
    <main className="app-page">
      <div className="app-container">
        <p className="brand">⚽ MatchDay Hub</p>

        <h1 className="page-title">Schedule Builder</h1>

        <p className="page-description">
          Create and organise fixtures across your tournament fields.
        </p>

        <div className="card">
          <h2>Create Fixture</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="homeTeam">Home Team</label>
              <input
                id="homeTeam"
                type="text"
                value={homeTeam}
                onChange={(event) => setHomeTeam(event.target.value)}
                placeholder="e.g. Lions FC"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="awayTeam">Away Team</label>
              <input
                id="awayTeam"
                type="text"
                value={awayTeam}
                onChange={(event) => setAwayTeam(event.target.value)}
                placeholder="e.g. Tigers FC"
                required
              />
            </div>

            <div className="fixture-row">
              <div className="form-group">
                <label htmlFor="field">Field</label>
                <select
                  id="field"
                  value={field}
                  onChange={(event) => setField(event.target.value)}
                >
                  <option>Field 1</option>
                  <option>Field 2</option>
                  <option>Field 3</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="matchTime">Match Time</label>
                <select
  id="matchTime"
  value={matchTime}
  onChange={(event) => setMatchTime(event.target.value)}
  required
>
  <option value="">Select match time</option>
  <option value="09:00">9:00 AM</option>
  <option value="09:30">9:30 AM</option>
  <option value="10:00">10:00 AM</option>
  <option value="10:30">10:30 AM</option>
  <option value="11:00">11:00 AM</option>
  <option value="11:30">11:30 AM</option>
  <option value="12:00">12:00 PM</option>
  <option value="12:30">12:30 PM</option>
  <option value="13:00">1:00 PM</option>
  <option value="13:30">1:30 PM</option>
  <option value="14:00">2:00 PM</option>
  <option value="14:30">2:30 PM</option>
  <option value="15:00">3:00 PM</option>
  <option value="15:30">3:30 PM</option>
  <option value="16:00">4:00 PM</option>
  <option value="16:30">4:30 PM</option>
  <option value="17:00">5:00 PM</option>
</select>
              </div>
            </div>

            <button className="primary-button" type="submit">
              Create Fixture
            </button>
          </form>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>
    </main>
  )
}

export default ScheduleBuilder