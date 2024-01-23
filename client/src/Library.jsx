import { useState } from 'react'
import SessionBlock from "./SessionBlock"


function Library({ sessions, setSessions, practitioners, setPractitioners }) {

    function find_pract(input) {
        for (const each of practitioners) {
            if (each.id === input) {
                return each.name
            }
        }}


    
    return(
       
        <main id="library-container">
            <h2>Featured Sessions</h2>
            <div id="sessionblocks-container">
                {sessions ? sessions.map((each) => {
                    return <SessionBlock
                        key={each.id}
                        id={each.id}
                        title={each.title}
                        link={each.link}
                        practitioner={find_pract(each.practitioner_id)}
                    />   
                })
                :
                <p>no sessions to load</p>
            }
            </div>
            <h2>Featured Practitioners</h2>

        </main>



    )



}

export default Library