import { useState, useEffect } from 'react'
import './App.css'
import QuoteCard from './components/QuoteCard'
import Footer from './components/Footer'

const API = 'https://api.freeapi.app/api/v1/public/quotes'
const LIMIT = 12

export default function App() {
  const [quotes, setQuotes]         = useState([])
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [dark, setDark]             = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API}?page=${page}&limit=${LIMIT}`)
      .then(r => r.json())
      .then(json => {
        setQuotes(json.data.data)
        setTotalPages(json.data.totalPages)
        window.scrollTo({ top: 0 })
      })
      .catch(() => setError('Failed to load quotes. Please try again.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <>
      <div className="page">
        <div className="header">
          <h1>Quotes <span>Gallery</span></h1>
          <div className="header-right">
            <button className="theme-btn" onClick={() => setDark(d => !d)}>
              {dark ? '☀ Light' : '☾ Dark'}
            </button>
          </div>
        </div>

        {loading && <div className="state">Loading quotes...</div>}
        {error   && <div className="state error">{error}</div>}

        {!loading && !error && (
          <div className="grid">
            {quotes.map(q => <QuoteCard key={q.id} quote={q} />)}
          </div>
        )}

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
