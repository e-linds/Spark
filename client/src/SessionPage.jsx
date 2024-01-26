import { useState, useEffect } from 'react'
import YouTube from "react-youtube"
import { json, useParams } from 'react-router-dom';



function SessionPage({ currentSession, setCurrentSession, findPract, getVidId, user, mySparks, setMySparks, setUserSessionList, userSessionList, refresh, setRefresh }) {
    const [sessionCategories, setSessionCategories] = useState([])
    const [inMySparks, setInMySparks] = useState(null)
    const [buttonReady, setButtonReady] = useState(true)

    

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


    useEffect(() => {


        if (mySparks) {

            if (checkMySparks() === true) {
                setInMySparks(true)
            } else if (checkMySparks() === false) {
                setInMySparks(false)
            }
            
        }}, [])


    function checkMySparks() {

        for (const each in mySparks) {
            if (mySparks[each].id === currentSession.id) {
                return true
            }}
        return false
            
    }

    function handleClick() {
        // setRefresh(!refresh)


        if (inMySparks === false) {

            //add to mysparks
            
            const new_usersesh = {
                session_id: currentSession.id,
                user_id: user.id
            }
    
           
            fetch('/api/us', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(new_usersesh)
            })
            .then(r => r.json())
            .then(data => {
                console.log(data)

                let usersesh_list = []
                
                console.log(data)
                
                for (const each in data) {
                    if (data[each].user_id === user.id) {
                        usersesh_list.push(data[each])  
                    }}
                    setUserSessionList(usersesh_list)
                    console.log(usersesh_list)
                    console.log("successfully added")

                    let session_list = []
                    for (const each in usersesh_list) {
                    session_list.push(usersesh_list[each].session)
                }
                    setMySparks(session_list)
                    setInMySparks(true)
                
    
                    // setRefresh(!refresh)
                // setButtonReady(true)
          
            })

    


        } else if (inMySparks === true) {

            //remove from mysparks

            console.log(userSessionList)

        let this_usersesh_id = ""
       
        for (const each in userSessionList) {
            if (userSessionList[each].session_id === currentSession.id) {
                this_usersesh_id = userSessionList[each].id
            }
        }

        if (this_usersesh_id) {

        fetch(`/api/usersessions/${this_usersesh_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: {}
        })
        .then(response => {})
        .then(data => {

            const array = userSessionList

            for (const each in array) {
                if (array[each].id === this_usersesh_id) {
                    const index = (array.indexOf(array[each]))
                    array.splice(index, 1)
                    setUserSessionList(array)

                    let session_list = []
                    for (const each in array) {
                    session_list.push(array[each].session)
                }
                    setMySparks(session_list)
                }
            }

                   
            // setRefresh(!refresh)
            // setButtonReady(true)
            setInMySparks(false)
            console.log("successfully removed")

        })
    }
            
            


















        }
        // checkMySparks()

    }









    // function addtoMySparks() {
      

        
            
    // }

    console.log(userSessionList)


    // function removefromMySparks() {
    //     // setButtonReady(false)
    //     //remove user session instance - delete


        

    // }

   

    
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
