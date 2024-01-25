import { useState, useEffect } from 'react'
import YouTube from "react-youtube"
import { json, useParams } from 'react-router-dom';



function SessionPage({ currentSession, setCurrentSession, findPract, getVidId, user, mySparks, setMySparks, userSessionList, refresh, setRefresh }) {
    const [sessionCategories, setSessionCategories] = useState([])
    const [inMySparks, setInMySparks] = useState(null)
    const [buttonReady, setButtonReady] = useState(true)

    

    let { sessionid } = useParams();

    useEffect(() => {
            
        fetch(`/api/sessions/${ sessionid }`)
        .then(r => r.json())
        .then(data => setCurrentSession(data))
        }, [userSessionList]
    )

    useEffect(() => {
        fetch(`/api/sessions/${ sessionid }/categories`)
        .then(r => r.json())
        .then(data => {
            setSessionCategories(data)
        })
    }, [])


    useEffect(() => {


        if (mySparks) {

            if (checkMySparks() === true) {
                setInMySparks(true)
            } else if (checkMySparks() === false) {
                setInMySparks(false)
            }
            
        }}, [mySparks, userSessionList, refresh])


    function checkMySparks() {

        for (const each in mySparks) {
            if (mySparks[each].id === currentSession.id) {
                return true
            }}
        return false
            
    }

    function addtoMySparks() {
        setButtonReady(false)
        // add usersession instance - post

        setRefresh(!refresh)

        const new_usersesh = {
            session_id: currentSession.id,
            user_id: user.id
        }

        // let firstInstance = true

        // for (const each in userSessionList) {
        //     if (userSessionList[each].session_id === currentSession.id && userSessionList[each].user_id === user.id) {
        //         firstInstance = false
        //     }
        // }

        // console.log(firstInstance)

        fetch('/api/us', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(new_usersesh)
        })
        .then(r => r.json())
        .then(data => {
            setRefresh(!refresh)
            setButtonReady(true)})
            setInMySparks(true)
            
    }


    function removefromMySparks() {
        setButtonReady(false)
        //remove user session instance - delete


        let this_usersesh_id = ""
       
        for (const each in userSessionList) {
            if (userSessionList[each].session_id === currentSession.id) {
                this_usersesh_id = userSessionList[each].id
            }
        }

        if (this_usersesh_id) {

        fetch(`/api/usersessions/${this_usersesh_id}`, {
            method: "DELETE"
        })
        .then(r => {})
        .then(data => {
            
            setRefresh(!refresh)
            setButtonReady(true)
            console.log("hello")

        })
    }

    }

    function handleClick() {
        setRefresh(!refresh)
        if (inMySparks === true) {
            removefromMySparks()
            setInMySparks(false)

            
        } else if (inMySparks === false) {
            addtoMySparks()
            setInMySparks(true)
        }
        checkMySparks()

    }

    
    //embedded youtube video details
    const options = {
        height: '390',

        playerVars: {
          autoplay: 1,
          controls: 1,
        }}

        // console.log(inMySparks)


    return(

        <>
        {currentSession ? 
        <>
        <main id="sessionpage-container">
            <h3>{currentSession.title} with {findPract(currentSession.practitioner_id)}</h3>
            {buttonReady ? 
            <button className="addtomysparks-btn" onClick={handleClick}>{inMySparks ? "Remove from My Sparks": "Add to My Sparks"}</button>
        :
        <button className="addtomysparks-btn">Loading...</button>}
            
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
        


    )}


export default SessionPage
