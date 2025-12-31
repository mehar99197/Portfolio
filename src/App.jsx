import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './App.css'

const Header = lazy(() => import('./frontend/components/Header'))
const Footer = lazy(() => import('./frontend/components/Footer'))
const Home = lazy(() => import('./frontend/pages/Home'))
const About = lazy(() => import('./frontend/pages/About'))
const Projects = lazy(() => import('./frontend/pages/Projects'))
const Contact = lazy(() => import('./frontend/pages/Contact'))
const Login = lazy(() => import('./frontend/pages/Login'))
const Dashboard = lazy(() => import('./frontend/pages/Dashboard'))

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
  </div>
)

const PortfolioPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <main className="flex-grow">
          <Home name="< Ahmad Nawaz />" devtype="Computer Scientist" />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
