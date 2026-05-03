import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'

const API = 'https://api.freeapi.app/api/v1/public/randomjokes'
const LIMIT = 10

function JokeCard({ joke }) {
  return (
    <div className="joke-card">
      <div className="joke-number">#{joke.id}</div>
      <p className="joke-text">{joke.content}</p>
      {joke.categories.length > 0 && (
        <span className="joke-tag">{joke.categories[0]}</span>
      )}
    </div>
  )
}

export default function App() {
  const [jokes, setJokes]           = useState([])
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [dark, setDark]             = useState(false)

  // toggle dark class on body
  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  // fetch jokes whenever page changes
  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API}?page=${page}&limit=${LIMIT}`)
      .then(r => r.json())
      .then(json => {
        setJokes(json.data.data)
        setTotalPages(json.data.totalPages)
      })
      .catch(() => setError('Failed to load jokes. Please try again.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <>
      <div className="page">

        {/* Header */}
        <div className="header">
          <h1>Jokes <span>Viewer</span></h1>
          <button className="theme-btn" onClick={() => setDark(d => !d)}>
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>

        {/* States */}
        {loading && <div className="state">Loading jokes...</div>}
        {error   && <div className="state error">{error}</div>}

        {/* Jokes list */}
        {!loading && !error && (
          <div className="jokes-grid">
            {jokes.map(joke => (
              <JokeCard key={joke.id} joke={joke} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="pagination">
            <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next →</button>
          </div>
        )}

      </div>

      <Footer />
    </>
  )
}
