import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [backendStatus, setBackendStatus] = useState('Checking backend...')
  const [dashboardData, setDashboardData] = useState(null)

useEffect(() => {
  fetch('https://matchdayhub-api.onrender.com/api/health')
    .then((response) => response.json())
    .then((data) => setBackendStatus(data.message))
    .catch(() => setBackendStatus('Backend connection failed'))
}, [])
useEffect(() => {
  fetch('https://matchdayhub-api.onrender.com/api/dashboard')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not load dashboard data')
      }

      return response.json()
    })
    .then((data) => {
      setDashboardData(data)
    })
    .catch(() => {
      setDashboardData(null)
    })
}, [])
  return (
    <main className="app-page">
      <div className="app-container">
        <p className="brand">⚽ MatchDay Hub</p>

        <h1 className="page-title">Tournament Dashboard</h1>

        <p className="page-description">
          Your match-day operations at a glance.
        </p>
        <p className="backend-status">
  ● {backendStatus}
</p>

        <div className="dashboard-grid">
          <div className="card stat-card">
            <p className="stat-label">Active Fields</p>

<p className="stat-number">
  {dashboardData ? dashboardData.active_fields : '—'}
</p>

<span className="status-text">
  Fields with scheduled fixtures
</span>
          </div>

          <div className="card stat-card">
            <p className="stat-label">Completed Matches</p>

<p className="stat-number">
  {dashboardData ? dashboardData.completed_matches : '—'}
</p>

<span className="status-text">
  Results recorded
</span>
          </div>

          <div className="card stat-card">
           <p className="stat-label">Recent Score</p>

{dashboardData?.recent_result ? (
  <>
    <p className="recent-match">
      {dashboardData.recent_result.home_team}
      {' '}
      <strong>{dashboardData.recent_result.home_score}</strong>
      {' — '}
      <strong>{dashboardData.recent_result.away_score}</strong>
      {' '}
      {dashboardData.recent_result.away_team}
    </p>

    <span className="status-text">
      Latest completed match
    </span>
  </>
) : (
  <>
    <p className="stat-number">—</p>
    <span className="status-text">
      No completed matches yet
    </span>
  </>
)}
          </div>
        </div>

        <div className="dashboard-actions">
          <button
            className="primary-button"
            onClick={() => navigate('/schedule')}
          >
            Open Schedule Builder
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('/scores')}
          >
            Open Live Scores
          </button>
        </div>
      </div>
    </main>
  )
}

export default Dashboard