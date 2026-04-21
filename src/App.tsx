import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { About } from './pages/About'
import { Home } from './pages/Home'

export const AppRoutes = () => (
  <>
    <nav>
      <Link to="/">Home</Link>
      <span className="sep">/</span>
      <Link to="/about">About</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </>
)

export const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)
