import { useState, useEffect } from 'react'
import { getCurrentUser } from './api'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import ApiInfo from './components/ApiInfo'
import Footer from './components/Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        <aside className="hidden md:flex w-80 shrink-0 bg-white border-r border-gray-100 p-6 overflow-y-auto">
          <ApiInfo />
        </aside>
        <main className="flex-1 flex items-center justify-center p-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('login')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data.data))
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <Layout>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </Layout>
    )
  }

  if (user) {
    return (
      <Layout>
        <Profile user={user} onLogout={() => setUser(null)} />
      </Layout>
    )
  }

  if (view === 'register') {
    return (
      <Layout>
        <Register onSwitch={() => setView('login')} />
      </Layout>
    )
  }

  return (
    <Layout>
      <Login onLogin={setUser} onSwitch={() => setView('register')} />
    </Layout>
  )
}
