import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { About } from './pages/About'
import { Board } from './pages/Board'
import { Home } from './pages/Home'
import { Order } from './pages/Order'
import { Predict } from './pages/Predict'

export const AppRoutes = () => (
  <>
    <nav>
      <Link to="/">Home</Link>
      <span className="sep">/</span>
      <Link to="/board">Board</Link>
      <span className="sep">/</span>
      <Link to="/order">Order</Link>
      <span className="sep">/</span>
      <Link to="/predict">Predict</Link>
      <span className="sep">/</span>
      <Link to="/about">About</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
      <Route path="/order" element={<Order />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </>
)

export const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)
