import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'

const API = 'https://api.freeapi.app/api/v1/public/randomusers'
const LIMIT = 12

function Modal({ user, onClose }) {
  const { name, email, phone, cell, dob, location, login, nat, gender, picture } = user
  const fullName = `${name.title} ${name.first} ${name.last}`
  const address = `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country}`

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <img className="modal-avatar" src={picture.large} alt={fullName} />
          <div>
            <div className="modal-name">{fullName}</div>
            <div className="modal-username">@{login.username}</div>
            <div className="modal-nat">{nat} · {gender}</div>
          </div>
        </div>
        <div className="modal-rows">
          <div className="modal-row"><span>Email</span><span>{email}</span></div>
          <div className="modal-row"><span>Phone</span><span>{phone}</span></div>
          <div className="modal-row"><span>Cell</span><span>{cell}</span></div>
          <div className="modal-row"><span>Age</span><span>{dob.age} yrs</span></div>
          <div className="modal-row"><span>Location</span><span>{address}</span></div>
          <div className="modal-row"><span>Timezone</span><span>{location.timezone.description}</span></div>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

function UserCard({ user, onClick }) {
  const { name, login, location, picture, gender } = user
  const fullName = `${name.first} ${name.last}`
  return (
    <div className="card" onClick={() => onClick(user)}>
      <img className="card-avatar" src={picture.medium} alt={fullName} />
      <div className="card-name">{fullName}</div>
      <div className="card-username">@{login.username}</div>
      <div className="card-location">{location.city}, {location.country}</div>
      <span className="card-badge">{gender}</span>
    </div>
  )
}

export default function App() {
  const [users, setUsers]           = useState([])
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
        setUsers(json.data.data)
        setTotalPages(json.data.totalPages)
        window.scrollTo({ top: 0 })
      })
      .catch(() => setError('Failed to load users. Please try again.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <>
      <div className="page">
        <div className="header">
          <h1>Random <span>Users</span></h1>
          <button className="theme-btn" onClick={() => setDark(d => !d)}>
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>

        {loading && <div className="state">Loading users...</div>}
        {error   && <div className="state error">{error}</div>}

        {!loading && !error && (
          <div className="grid">
            {users.map(u => <UserCard key={u.id} user={u} onClick={setSelected} />)}
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
      {selected && <Modal user={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
