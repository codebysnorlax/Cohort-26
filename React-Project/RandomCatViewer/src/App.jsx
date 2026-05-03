import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'

const API = 'https://api.freeapi.app/api/v1/public/cats/cat/random'

const TRAITS = [
  { key: 'adaptability',     label: 'Adaptability' },
  { key: 'affection_level',  label: 'Affection' },
  { key: 'energy_level',     label: 'Energy' },
  { key: 'intelligence',     label: 'Intelligence' },
  { key: 'child_friendly',   label: 'Kid Friendly' },
  { key: 'dog_friendly',     label: 'Dog Friendly' },
]

function TraitBar({ label, value }) {
  return (
    <div className="trait-row">
      <span className="trait-label">{label}</span>
      <div className="trait-bar">
        <div className="trait-fill" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <span className="trait-val">{value}/5</span>
    </div>
  )
}

export default function App() {
  const [cat, setCat]         = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [dark, setDark]       = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  const fetchCat = () => {
    setLoading(true)
    setError('')
    fetch(API)
      .then(r => r.json())
      .then(json => {
        const data = json.data
        setCat(data)
        // keep last 10 in history
        if (data.image) {
          setHistory(prev => [{ id: data.id, image: data.image, name: data.name }, ...prev].slice(0, 10))
        }
      })
      .catch(() => setError('Failed to fetch cat. Please try again.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCat() }, [])

  return (
    <>
      <div className="page">
        <div className="header">
          <h1>Random <span>Cat</span> 🐱</h1>
          <button className="theme-btn" onClick={() => setDark(d => !d)}>
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>

        {error && <div className="state">{error}</div>}

        {!error && (
          <div className="viewer">
            {/* Image */}
            <div className="cat-img-wrap">
              {loading
                ? <div className="placeholder">🐱</div>
                : <img src={cat?.image} alt={cat?.name} />
              }
            </div>

            {/* Info */}
            {!loading && cat && (
              <div className="cat-info">
                <div className="cat-name">{cat.name}</div>
                <div className="cat-badges">
                  <span className="badge">{cat.origin}</span>
                  <span className="badge">⏳ {cat.life_span} yrs</span>
                  {cat.lap === 1 && <span className="badge">🛋 Lap cat</span>}
                  {cat.indoor === 1 && <span className="badge">🏠 Indoor</span>}
                </div>
                <p className="cat-desc">{cat.description}</p>
                {cat.temperament && (
                  <p className="cat-desc"><strong style={{color:'var(--accent)'}}>Temperament:</strong> {cat.temperament}</p>
                )}
                <div className="traits-title">Traits</div>
                <div className="traits">
                  {TRAITS.map(t => (
                    <TraitBar key={t.key} label={t.label} value={cat[t.key]} />
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="cat-info" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="state">Loading...</div>
              </div>
            )}
          </div>
        )}

        <button className="next-btn" onClick={fetchCat} disabled={loading}>
          Next Cat →
        </button>

        {/* History */}
        {history.length > 1 && (
          <div className="history-section">
            <div className="history-title">Previously seen</div>
            <div className="history-grid">
              {history.slice(1).map(h => (
                <img
                  key={h.id}
                  className="history-thumb"
                  src={h.image}
                  alt={h.name}
                  title={h.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
