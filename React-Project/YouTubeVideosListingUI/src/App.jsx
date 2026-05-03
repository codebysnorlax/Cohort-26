import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'

const API = 'https://api.freeapi.app/api/v1/public/youtube/videos'
const LIMIT = 12

// convert ISO 8601 duration PT19M35S → 19:35
function parseDuration(iso) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = parseInt(m[1] || 0)
  const min = parseInt(m[2] || 0)
  const sec = String(parseInt(m[3] || 0)).padStart(2, '0')
  return h > 0 ? `${h}:${String(min).padStart(2,'0')}:${sec}` : `${min}:${sec}`
}

function formatCount(n) {
  const num = parseInt(n)
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return String(num)
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`
  return `${Math.floor(diff / 31536000)}y ago`
}

function Modal({ video, onClose }) {
  const { snippet, statistics, contentDetails } = video
  const id = video.id
  const tags = snippet.tags?.slice(0, 6) || []

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <iframe
          className="modal-video"
          src={`https://www.youtube.com/embed/${id}`}
          title={snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="modal-body">
          <div className="modal-title">{snippet.title}</div>
          <div className="modal-channel">{snippet.channelTitle}</div>
          <div className="modal-stats">
            <span>👁 {formatCount(statistics.viewCount)} views</span>
            <span>👍 {formatCount(statistics.likeCount)}</span>
            <span>💬 {formatCount(statistics.commentCount)}</span>
            <span>🕒 {timeAgo(snippet.publishedAt)}</span>
          </div>
          <p className="modal-desc">{snippet.description}</p>
          {tags.length > 0 && (
            <div className="modal-tags">
              {tags.map(t => <span key={t} className="tag">#{t}</span>)}
            </div>
          )}
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

function VideoCard({ video, onClick }) {
  const { snippet, statistics, contentDetails } = video
  const thumb = snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url
  const duration = parseDuration(contentDetails.duration)

  return (
    <div className="card" onClick={() => onClick(video)}>
      <div className="thumb-wrap">
        <img className="card-thumb" src={thumb} alt={snippet.title} loading="lazy" />
        {duration && <span className="duration">{duration}</span>}
      </div>
      <div className="card-body">
        <div className="card-title">{snippet.title}</div>
        <div className="card-channel">{snippet.channelTitle}</div>
        <div className="card-meta">
          <span>{formatCount(statistics.viewCount)} views</span>
          <span>{timeAgo(snippet.publishedAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [videos, setVideos]         = useState([])
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected]     = useState(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [dark, setDark]             = useState(false)

  useEffect(() => { document.body.classList.toggle('dark', dark) }, [dark])

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API}?page=${page}&limit=${LIMIT}`)
      .then(r => r.json())
      .then(json => {
        setVideos(json.data.data.map(v => v.items))
        setTotalPages(json.data.totalPages)
        window.scrollTo({ top: 0 })
      })
      .catch(() => setError('Failed to load videos. Please try again.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <>
      <div className="header">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube
        </div>
        <button className="theme-btn" onClick={() => setDark(d => !d)}>
          {dark ? '☀ Light' : '☾ Dark'}
        </button>
      </div>

      <div className="page">
        {loading && <div className="state">Loading videos...</div>}
        {error   && <div className="state error">{error}</div>}

        {!loading && !error && (
          <div className="grid">
            {videos.map(v => <VideoCard key={v.id} video={v} onClick={setSelected} />)}
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
      {selected && <Modal video={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
