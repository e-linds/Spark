import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function PractitionerBlock({ id, name, self }) {
    const[displaySessions, setDisplaySessions] = useState([])

    useEffect(() => {

        
        fetch(`/api/practitioners/${id}/sessions`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setDisplaySessions(data)})

    },[])


    return(
        <Link to="/home">
            <article id="practitionerblock" class="section" >
                <p id="practitionerblock-name">{name}</p>
                <p id="practitionersessions">{displaySessions ? 
                displaySessions.map((each) => {
                    if (displaySessions.length == 1) {
                        return (<Link to={`/sessions/${id}`}>{each.title}</Link> )
                    } else {
                    return (<Link to={`/sessions/${id}`}> {each.title} |</Link> )
                    }
                })
                :
                null}</p>
            </article>
        </Link>
    )
}

export default PractitionerBlock