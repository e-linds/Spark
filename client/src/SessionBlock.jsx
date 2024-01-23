import React, { useState } from 'react'
import { Link } from "react-router-dom"


function SessionBlock({ title, link, practitioner, id, self, setCurrentSession }) {

    // const articleStyle = {
    //     backgroundImage: `${link}`,
    //     opacity: .5,
    //     borderRadius: "2px"

    // }



    
    return(
        <>
        <Link to={`/sessions/${id}`}>
            <article id="sessionblock" class="section" style={{backgroundImage: `${link}`}} onClick={() => setCurrentSession(self)}>
                <p>{title}: {practitioner}</p>
            </article>
        </Link>
        </>
    )
}

export default SessionBlock

