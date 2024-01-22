import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Opening from './opening.jsx'
import Library from './Library.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [stay, setStay] = useState(false)
  const [user, setUser] = useState(null)
  const [sessions, setSessions] = useState([])
  const [practitioners, setPractitioners] = useState([])

  useEffect(()=>{
    fetch('/api/check_session')
    .then(r =>{
      if(r.ok){
        return r.json()
      }
      else{
        return null
      }
    })
    .then(data => setUser(data))
  },[])

  // useEffect(() => {
  //   fetch('/api/sessions')
  //   .then(r => r.json())
  // .then(data => setSessions(data))  })

  
  
  
  
  function handleClick() {

          fetch("/api/logout", {
            method: "DELETE"
        })
        .then(r => setUser(null)
        )}


  return (
    <div>
      {user ? 
      <>
      <header class="grid">
      <h1>Welcome, {user.name}</h1> 
      <div id="header-details">
          <a href="/library">Library</a>
          <a>My Sparks</a>
          <a>My Profile</a>
          <button id="logoutbtn" onClick={handleClick}>Logout</button>
        </div>
      </header>
      <Library sessions={sessions} setSessions={setSessions}/>
      </>
      : 
      <Opening stay={stay} setStay={setStay} user={user} setUser={setUser} />
      }
    </div>
  )
}

export default App
