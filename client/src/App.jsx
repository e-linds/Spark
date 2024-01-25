import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
// import { Link } from 'react-router-dom'
import './App.css'
import Opening from './opening.jsx'
import Library from './Library.jsx'
import Header from './Header.jsx'
import SessionPage from './SessionPage.jsx'
import MyProfile from './MyProfile.jsx'
import MySparks from './MySparks.jsx'

function App() {
  const [refresh, setRefresh] = useState(false)
  const [stay, setStay] = useState(false)
  const [user, setUser] = useState(null)
  const [sessions, setSessions] = useState([])
  const [practitioners, setPractitioners] = useState([])
  const [categories, setCategories] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [currentTab, setCurrentTab] = useState("library")
  const [userSessionList, setUserSessionList] = useState([])
  const [mySparks, setMySparks] = useState([])

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

  useEffect(() => {

    fetch('/api/us')
    .then(r => r.json())
    .then(data => {
            let usersesh_list = []

            if (user) {
            
                // usersesh_list array has a list of all usersession instances which are associated with this user
                for (const each in data) {
                    if (data[each].user_id === user.id) {
                        usersesh_list.push(data[each])  
                    }}
                console.log(usersesh_list)
                setUserSessionList(usersesh_list)
                //session_list array has ids of all sessions from above array
                let session_list = []
                for (const each in usersesh_list) {
                    session_list.push(usersesh_list[each].session)
                }
                setMySparks(session_list)

          }

          })

  }, [user, refresh])

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
              mySparks={mySparks}
              setMySparks={setMySparks}
              userSessionList={userSessionList}
              refresh={refresh}
              setRefresh={setRefresh}
              />}/>
            </Route>
            <Route path="/mysparks" element={<MySparks 
            user={user} 
            sessions={sessions} 
            findPract={findPract} 
            getVidId={getVidId} 
            mySparks={mySparks}
            refresh={refresh}
            setRefresh={setRefresh}
            />}/>
            <Route path="/users" element={<MyProfile user={user} setUser={setUser}/>}/>
            {/* <Route path="*" element={<Navigate to="/library" />} /> */}

      </Routes> 
      </>
      :
      <Routes>
            <Route path="/library" element={<Opening stay={stay} setStay={setStay} user={user} setUser={setUser}/>}/>
            <Route path="*" element={<Navigate to="/library" />} />
      </Routes>  
      } 
    </BrowserRouter>





  )
}

export default App
