import { useState, useEffect } from 'react'
import YouTube from "react-youtube"
import { useParams } from 'react-router-dom';



function SessionPage({ currentSession, setCurrentSession, findPract }) {
    const [sessionCategories, setSessionCategories] = useState([])

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
            console.log(data)
            setSessionCategories(data)
        })
    }, [])

    function getVidId(input) {
        const linkArray = input.split('')
        const indexToSplit = linkArray.findIndex((item) => item === "=")
        const vidId = (linkArray.slice(indexToSplit + 1)).join('')
        return vidId
    }


    const options = {
        height: '390',

        playerVars: {
          autoplay: 1,
          controls: 1,
        }}

    


    return(

        <>
        {currentSession ? 
        <>
        <main id="sessionpage-container">
            <h3>{currentSession.title} with {findPract(currentSession.practitioner_id)}</h3>
            <button id="addtomysparks-btn">Add to My Sparks</button>
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
