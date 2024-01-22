import { useState } from 'react'
import SessionBlock from "./SessionBlock"


function Library({ sessions, setSessions }) {
    
    
    
    return(
        <main id="library-container">
            <h2>Featured Sessions</h2>
            <div id="sessionblocks-container">
                {sessions ? sessions.map((each) => {
                    return <SessionBlock
                        key={each.id}
                        id={each.id}
                        title={each.title}
                        practitioner={each.practitioner_id}
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