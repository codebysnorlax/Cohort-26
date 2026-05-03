import { useState, useEffect } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'

const API = 'https://api.freeapi.app/api/v1/public/randomproducts'
const LIMIT = 12

function Modal({ product, onClose }) {
  const [img, setImg] = useState(product.thumbnail)
  const discounted = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
  const inStock = product.stock > 0
  const fallback = `https://placehold.co/600x400/e5e5e5/888?text=${encodeURIComponent(product.title)}`

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-grid">
          <img
            className="modal-img"
            src={img}
            alt={product.title}
            onError={e => { e.target.onerror = null; e.target.src = fallback }}
          />
          <div className="modal-body">
            <div className="modal-category">{product.category}</div>
            <div className="modal-title">{product.title}</div>
            <div className="modal-brand">{product.brand}</div>
            <p className="modal-desc">{product.description}</p>

            <div className="modal-price-row">
              <span className="modal-price">${discounted}</span>
              <span className="modal-badge green">-{product.discountPercentage}%</span>
              <span className={`modal-badge ${inStock ? 'green' : 'red'}`}>
                {inStock ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="modal-meta">
              <span>Rating: <strong>{product.rating} ★</strong></span>
              <span>Original: <strong>${product.price}</strong></span>
            </div>

            {product.images?.length > 1 && (
              <div className="modal-thumbs">
                {product.images.map((src, i) => (
                  <img key={i} src={src} alt="" onClick={() => setImg(src)} onError={e => { e.target.onerror = null; e.target.src = fallback }} />
                ))}
              </div>
            )}

            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [products, setProducts]     = useState([])
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected]     = useState(null)
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
        setProducts(json.data.data)
        setTotalPages(json.data.totalPages)
      })
      .catch(() => setError('Failed to load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <>
      <div className="page">
        <div className="header">
          <h1>Product <span>Listing</span></h1>
          <button className="theme-btn" onClick={() => setDark(d => !d)}>
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>

        {loading && <div className="state">Loading products...</div>}
        {error   && <div className="state error">{error}</div>}

        {!loading && !error && (
          <div className="grid">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onClick={setSelected} />
            ))}
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

      {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
