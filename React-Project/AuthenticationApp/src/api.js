const BASE = '/api/v1/users'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const register = (body) =>
  request('/register', { method: 'POST', body: JSON.stringify(body) })

export const login = (body) =>
  request('/login', { method: 'POST', body: JSON.stringify(body) })

export const logout = () =>
  request('/logout', { method: 'POST' })

export const getCurrentUser = () =>
  request('/current-user')
