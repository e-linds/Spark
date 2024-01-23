import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import SessionBlock from "./SessionBlock"
import SessionPage from './SessionPage.jsx'



function Library({ sessions, setSessions, practitioners, setPractitioners, setCurrentSession, findPract }) {
    


    
    return(
       <>
        <main id="library-container">
            <h2>Featured Sessions</h2>
            <div id="sessionblocks-container">
                {sessions ? sessions.map((each) => {
                    return <SessionBlock
                        key={each.id}
                        id={each.id}
                        title={each.title}
                        link={each.link}
                        self={each}
                        practitioner={findPract(each.practitioner_id)}
                        setCurrentSession={setCurrentSession}
                    />   
                })
                :
                <p>no sessions to load</p>
            }
            </div>
            <h2>Featured Practitioners</h2>


        </main>
        </>

    )
}

export default Library