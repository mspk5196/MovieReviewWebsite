import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavLink from './appLayout/NavLink'

function App() {

  return (
    <div>
      <BrowserRouter>
      <NavLink/>
      </BrowserRouter>
    </div>
  )
}

export default App
