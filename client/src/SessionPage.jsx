import { useEffect } from 'react'
import YouTube from "react-youtube"
import { useParams } from 'react-router-dom';



function SessionPage({ currentSession, setCurrentSession, findPract }) {

        let { sessionid } = useParams();

        useEffect(() => {
            
            fetch(`/api/sessions/${ sessionid }`)
            .then(r => r.json())
            .then(data => setCurrentSession(data))
            }, []
    )

    function getVidId(input) {
        const linkArray = input.split('')
        const indexToSplit = linkArray.findIndex((item) => item === "=")
        const vidId = (linkArray.slice(indexToSplit + 1)).join('')
        return vidId
    }


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
            <YouTube videoId={`${getVidId(currentSession.link)}`} options={options}/>
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
