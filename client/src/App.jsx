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
import MySparks from './MySparks.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [stay, setStay] = useState(false)
  const [user, setUser] = useState(null)
  const [sessions, setSessions] = useState([])
  const [practitioners, setPractitioners] = useState([])
  const [categories, setCategories] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [currentTab, setCurrentTab] = useState("library")

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

    function getVidId(input) {
      const linkArray = input.split('')
      const indexToSplit = linkArray.findIndex((item) => item === "=")
      const vidId = (linkArray.slice(indexToSplit + 1)).join('')
      return vidId
  }


  


  return (
    

    <BrowserRouter>
    { user ? 
      <>
      <Header user={user} setUser={setUser} setCurrentTab={setCurrentTab}/>
      <Routes>
            <Route path="/library" element={<Library 
            sessions={sessions} 
            practitioners={practitioners} 
            categories={categories}
            currentSession={currentSession} 
            setCurrentSession={setCurrentSession}
            findPract={findPract}
            getVidId={getVidId}
            />}/>
            <Route path="/sessions">
              <Route path=":sessionid" element={<SessionPage 
              currentSession={currentSession} 
              setCurrentSession={setCurrentSession} 
              findPract={findPract}
              getVidId={getVidId}
              user={user}
              />}/>
            </Route>
            <Route path="/mysparks" element={<MySparks user={user} sessions={sessions} findPract={findPract} getVidId={getVidId}/>}/>
            <Route path="/users" element={<MyProfile user={user} setUser={setUser}/>}/>

      </Routes> 
      </>
      :
      <Routes>
            <Route path="/library" element={<Opening stay={stay} setStay={setStay} user={user} setUser={setUser}/>}/>
      </Routes>  
      } 
    </BrowserRouter>





  )
}

export default App
