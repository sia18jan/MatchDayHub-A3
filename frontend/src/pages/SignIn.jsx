import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="app-page">
      <div className="app-container">
        <p className="brand">⚽ MatchDay Hub</p>

        <h1 className="page-title">Welcome back</h1>

        <p className="page-description">
          Sign in to manage your tournament day.
        </p>

        <div className="card">
          <h2>Organiser Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                placeholder="organiser@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button className="primary-button" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default SignIn