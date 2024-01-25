import { useInRouterContext, Link } from 'react-router-dom'
import SessionBlock from './SessionBlock.jsx'
import { useEffect, useState } from 'react'

function MySparks({ sessions, findPract, user, getVidId, mySparks, refresh, setRefresh }) {
    // const [displaySessions, setDisplaySessions] = useState([])

    useEffect(() => {
       console.log("hello") 
        setRefresh(!refresh)
    }, [])


// function getMySparks() {

//     const main_user = user
    
//     let sessionfilter = sessions.filter((each) => {

//         for (const person in each.users) {
//             if (each.users[person].user.id === main_user.id ) {
//                 return true
//             }}

//         return false
//     })

//     setDisplaySessions(sessionfilter)

// }


    return(
        <>
        <h2 id='mysparks-title'>My Sparks</h2>
                {mySparks ? 
                    <div className="sessionblocks-container">
                        {mySparks.map((each) => {
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
                    <Link id="browselink" to='/library'>
                        <article id="sessionblock" class="section" >+
                            {/* <p>hello</p> */}
                        </article>
                    </Link>
                    </div>
                :
                <div>No Sparks to display. Head to Library to start saving.</div>
            }
            
        </>
    )
}

export default MySparks