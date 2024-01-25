import React, { useState } from 'react'
import { Link } from "react-router-dom"


function SessionBlock({ title, link, practitioner, id, self, setCurrentSession, getVidId }) {

    const vidId = getVidId(link)
    const image = `http://img.youtube.com/vi/${vidId}/hqdefault.jpg`
      

     const articleStyling = {
        backgroundColor: "rgba(255, 255, 255, .5)",
        backgroundImage: `url(${image})`,
     }   
    


    
    return(
        <>
        <Link to={`/sessions/${id}`}>
            <article id="sessionblock" class="section" style={articleStyling} onClick={() => setCurrentSession(self)}>
                <p id="sessionblock-text">{title}: {practitioner}</p>
            </article>
        </Link>
        </>
    )
}

export default SessionBlock

