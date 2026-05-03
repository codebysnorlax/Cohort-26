import { useState } from 'react'
import { login } from '../api'

export default function Login({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [status, setStatus] = useState({ loading: false, error: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '' })
    try {
      const data = await login(form)
      onLogin(data.data.user)
    } catch (err) {
      setStatus({ loading: false, error: err.message })
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>

        {status.error && <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{status.error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {status.loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don&apos;t have an account?{' '}
          <button onClick={onSwitch} className="text-blue-600 hover:underline">Register</button>
        </p>
    </div>
  )
}
