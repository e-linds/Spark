import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
// import { Link } from 'react-router-dom'
import './App.css'
import Opening from './opening.jsx'
import Library from './Library.jsx'
import Header from './Header.jsx'
import SessionPage from './SessionPage.jsx'
import MyProfile from './MyProfile.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [stay, setStay] = useState(false)
  const [user, setUser] = useState(null)
  const [sessions, setSessions] = useState([])
  const [practitioners, setPractitioners] = useState([])
  const [categories, setCategories] = useState([])
  const [currentSession, setCurrentSession] = useState(null)

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

  useEffect(() => {
    fetch('/api/sessions')
    .then(r => r.json())
  .then(data => setSessions(data))  }, [])

  useEffect(() => {
    fetch('/api/practitioners')
    .then(r => r.json())
  .then(data => setPractitioners(data))  }, [])

  useEffect(() => {
    fetch('/api/categories')
    .then(r => r.json())
  .then(data => setCategories(data))  }, [])

  function findPract(input) {
    for (const each of practitioners) {
        if (each.id === input) {
            return each.name
        }
    }}


  


  return (
    

    <BrowserRouter>
    { user ? 
      <>
      <Header user={user} setUser={setUser}/>
      <Routes>
            <Route path="/library" element={<Library 
            sessions={sessions} 
            practitioners={practitioners} 
            categories={categories}
            currentSession={currentSession} 
            setCurrentSession={setCurrentSession}
            findPract={findPract}/>}/>
            <Route path="/sessions">
              <Route path=":sessionid" element={<SessionPage sessions={sessions} setSessions={setSessions} currentSession={currentSession} setCurrentSession={setCurrentSession} findPract={findPract}/>}/>
            </Route>
            <Route path="/users" element={<MyProfile user={user} setUser={setUser}/>}/>
      </Routes> 
      </>
      :
      <Routes>
            <Route path="/" element={<Opening stay={stay} setStay={setStay} user={user} setUser={setUser}/>}/>
      </Routes>  
      } 
    </BrowserRouter>





  )
}

export default App
