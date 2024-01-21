import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Opening from './opening.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Opening />
    </div>
  )
}

export default App
