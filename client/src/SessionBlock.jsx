import React from 'react'


function SessionBlock({ title, link, practitioner }) {

    const articleStyle = {
        backgroundImage: `${link}`,
        opacity: .5,
        borderRadius: "2px"

    }
    
    return(
        <article id="sessionblock" class="section" style={articleStyle}>
            <p>{title}: {practitioner}</p>
        </article>
    )
}

export default SessionBlock

