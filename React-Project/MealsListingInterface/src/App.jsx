import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'

const API = 'https://api.freeapi.app/api/v1/public/meals'
const LIMIT = 12

function getIngredients(meal) {
  const list = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    const mea = meal[`strMeasure${i}`]
    if (ing && ing.trim()) list.push(`${mea ? mea.trim() + ' ' : ''}${ing.trim()}`)
  }
  return list
}

function MealModal({ meal, onClose }) {
  const ingredients = getIngredients(meal)
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="modal-body">
          <h2>{meal.strMeal}</h2>
          <div className="modal-meta">
            {meal.strCategory && <span className="tag red">{meal.strCategory}</span>}
            {meal.strArea && <span className="tag">{meal.strArea}</span>}
            {meal.strTags && meal.strTags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="modal-section">
            <h3>Ingredients</h3>
            <div className="ingredients">
              {ingredients.map((ing, i) => <span key={i} className="tag">{ing}</span>)}
            </div>
          </div>
          <div className="modal-section">
            <h3>Instructions</h3>
            <p>{meal.strInstructions}</p>
          </div>
          <div className="modal-links">
            {meal.strYoutube && <a href={meal.strYoutube} target="_blank" rel="noreferrer">▶ Watch on YouTube</a>}
            {meal.strSource && <a href={meal.strSource} target="_blank" rel="noreferrer">↗ Source</a>}
          </div>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

function MealCard({ meal, onClick }) {
  return (
    <div className="card" onClick={() => onClick(meal)}>
      <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      <div className="card-body">
        <h2>{meal.strMeal}</h2>
        <div className="card-meta">
          {meal.strCategory && <span className="tag red">{meal.strCategory}</span>}
          {meal.strArea && <span className="tag">{meal.strArea}</span>}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [meals, setMeals] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ page, limit: LIMIT })
    if (query) params.set('query', query)
    fetch(`${API}?${params}`)
      .then(r => r.json())
      .then(json => {
        setMeals(json.data.data)
        setTotalPages(json.data.totalPages)
      })
      .catch(() => setError('Failed to load meals. Please try again.'))
      .finally(() => setLoading(false))
  }, [page, query])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    setQuery(search)
  }

  const clearSearch = () => {
    setSearch('')
    setQuery('')
    setPage(1)
  }

  return (
    <div className="page">
      <div className="header">
        <div className="header-text">
          <h1>Meals &amp; <span>Recipes</span></h1>
          <p>Browse {totalPages * LIMIT}+ meals from around the world</p>
        </div>
        <button className="theme-btn" onClick={() => setDark(d => !d)}>
          {dark ? '☀ Light' : '☾ Dark'}
        </button>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        {query && (
          <button className="clear-btn" onClick={clearSearch}>✕ Clear</button>
        )}
      </div>

      {loading && <div className="state">Loading meals...</div>}
      {error && <div className="state error">{error}</div>}

      {!loading && !error && meals.length === 0 && (
        <div className="state">No meals found for "{query}"</div>
      )}

      {!loading && !error && (
        <div className="grid">
          {meals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} onClick={setSelected} />
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next →</button>
        </div>
      )}

      {selected && <MealModal meal={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  )
}
