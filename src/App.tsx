import { Routes, Route } from 'react-router-dom'
import { Wizard } from '@/pages/Wizard'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Wizard />} />
    </Routes>
  )
}
