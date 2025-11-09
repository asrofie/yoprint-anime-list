import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
import NotFoundPage from '../pages/NotFoundPage'

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/anime/:id" element={<DetailPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
