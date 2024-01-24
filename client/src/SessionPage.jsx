import { useState, useEffect } from 'react'
import YouTube from "react-youtube"
import { useParams } from 'react-router-dom';



function SessionPage({ currentSession, setCurrentSession, findPract, getVidId, user }) {
    const [sessionCategories, setSessionCategories] = useState([])
    const [inMySparks, setInMySparks] = useState(false)

    

        let { sessionid } = useParams();

        useEffect(() => {
            
            fetch(`/api/sessions/${ sessionid }`)
            .then(r => r.json())
            .then(data => setCurrentSession(data))
            }, []
    )

    useEffect(() => {
        fetch(`/api/sessions/${ sessionid }/categories`)
        .then(r => r.json())
        .then(data => {
            setSessionCategories(data)
        })
    }, [])

    
    const options = {
        height: '390',

        playerVars: {
          autoplay: 1,
          controls: 1,
        }}


    
    
    function addtoMySparks() {
        // add usersession instance - post
        setInMySparks(true)
        
    }


    function removefromMySparks() {
        //remove user session instance - delete
        setInMySparks(false)


    }

    function handleClick() {



        let usersesh_list = []
        fetch('/api/us')
        .then(r => r.json())
        .then(data => {
            // usersesh_list array has a list of all usersession instances which are associated with this user
            for (const each in data) {
                if (data[each].user_id === user.id) {
                    usersesh_list.push(data[each])
                }
            }
            //session_list array has ids of all sessions from previous array
            let session_list = []
            for (const each in usersesh_list) {
                session_list.push(usersesh_list[each].session_id)
            }

            if (session_list.includes(currentSession.id)) {
                console.log("includes")
            } else {
                console.log("does not include")
            }

        })

    }

    // handleClick()


    return(

        <>
        {currentSession ? 
        <>
        <main id="sessionpage-container">
            <h3>{currentSession.title} with {findPract(currentSession.practitioner_id)}</h3>
            <button id="addtomysparks-btn">{inMySparks ? "Remove from My Sparks": "Add to My Sparks"}</button>
            <YouTube videoId={`${getVidId(currentSession.link)}`} options={options}/>
            <div id="sessiondetails-container">
                <p>{currentSession.text}</p>
                <div id="categorytags-container">
                    {sessionCategories.map((each) => {
                        return <span role="button" className="categorytag">{each.name}</span>
                    })}
                </div>
                
            </div>  
        </main>
        </>
        :
        <p>no current session</p>
        }
        </>
        


    )
}

export default SessionPage
