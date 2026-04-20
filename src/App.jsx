import { useState } from 'react'
import './App.css'
import PortfolioMain from './components/PortfolioMain';
import Portfolio from './Portfolio';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PortfolioMain/>
    {/* <Portfolio/> */}
    </>
  )
}

export default App
