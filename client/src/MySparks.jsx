import { useInRouterContext } from 'react-router-dom'
import SessionBlock from './SessionBlock.jsx'
import { useEffect, useState } from 'react'

function MySparks({ sessions, findPract, user, getVidId }) {
    const [displaySessions, setDisplaySessions] = useState([])


function getMySparks() {

    const main_user = user
    
    let sessionfilter = sessions.filter((each) => {

        for (const person in each.users) {
            if (each.users[person].user.id === main_user.id ) {
                return true
            }}

        return false
    })

    setDisplaySessions(sessionfilter)

}

useEffect(() => {
    getMySparks()
}, [])



    return(
        <>
        <h2>My Sparks</h2>
                {displaySessions ? 
                    <div className="sessionblocks-container">
                        {displaySessions.map((each) => {
                        return <SessionBlock
                            key={each.id}
                            id={each.id}
                            title={each.title}
                            link={each.link}
                            self={each}
                            practitioner={findPract(each.practitioner_id)}
                            getVidId={getVidId}
                        />   
                    })}
                    </div>
                :
                <div>No Sparks to display. Head to Library to start saving.</div>
            }
            
        </>
    )
}

export default MySparks