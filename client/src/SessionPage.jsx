import { useEffect } from 'react'
import YouTube from "react-youtube"
import { useParams } from 'react-router-dom';



function SessionPage({ currentSession, findPract }) {

    let { sessionid } = useParams();

        useEffect(() => {
            
            fetch(`/api/sessions/${currentSession.id ? currentSession.id : useParams()}`)
            .then(r => r.json())
            .then(data => console.log(data))
            }, []
    )

   
    
    console.log(useParams())
        


    const options = {
        height: '390',
        width: '300',
        playerVars: {
          autoplay: 1,
          controls: 1,
        }}


    return(

        <>
        {currentSession ? 
        <>
        <h3>{currentSession.title} with {findPract(currentSession.practitioner_id)}</h3>
        <main id="sessionpage-container" class="grid">
            {/* <img src={currentSession.link}/> */}
            <YouTube videoId="CVW_IE1nsKE" options={options}/>
            
            <p>{currentSession.text}</p>
        </main>
        </>
        :
        <p>no current session</p>
        }
        </>
        


    )
}

export default SessionPage
