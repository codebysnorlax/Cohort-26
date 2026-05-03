import { useState } from 'react'
import { logout } from '../api'

export default function Profile({ user, onLogout }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogout = async () => {
    setLoading(true)
    setError('')
    try {
      await logout()
      onLogout()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
            {user.username?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{user.role}</span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700 mb-6">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Email</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Username</span>
            <span>{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Role</span>
            <span>{user.role}</span>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition"
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
    </div>
  )
}
