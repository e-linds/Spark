import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import SessionBlock from "./SessionBlock"
import SortButton from './SortButton.jsx'



function Library({ sessions, practitioners, setCurrentSession, findPract, categories }) {
    const [sortCategories, setSortCategories] = useState([])
    const [displaySessions, setDisplaySessions] = useState(sessions)




    useEffect(() => {
        setDisplaySessions(sessions)
    }, [])

    


    function buttonChange(input) {

        let array = sortCategories

        if (array.includes(input)) {

            const indexToRemove = array.indexOf(input)
            array.splice(indexToRemove, 1)
            
            setSortCategories(array)
        
            
        } else if (array.includes(input) === false) {

            array.push(input)
            setSortCategories(array)
        
        }
        filterSessions()
    }

        



    function filterSessions() {
       

        let array = sortCategories

        let sessionfilter = sessions.filter((each) => {

            for (const categ in each.categories) {
                const name = (each.categories[categ].category.name)
                if (array.includes(name)) {
                    return true
                }}

            return false
    
        })
        console.log(sessionfilter)
        if (sessionfilter.length > 0) {
            setDisplaySessions(sessionfilter)
        } else {
            setDisplaySessions(sessions)
        }
    

    }

    
    return(
       <>
        <main id="library-container">
            <div id="librarysessions-title">
                <h2>Featured Sessions</h2>
                
                <div id="sortbuttons-container">
                    <p>Sort By:</p>
                    {categories.map((each) => {
                        return <SortButton 
                        key={each.id} 
                        name={each.name} 
                        sortCategories={sortCategories} 
                        setSortCategories={setSortCategories}
                        buttonChange={() => buttonChange(each.name)}/>
                    })}
                </div>
            </div>
            <div id="sessionblocks-container">
                {displaySessions ? displaySessions.map((each) => {
                    return <SessionBlock
                        key={each.id}
                        id={each.id}
                        title={each.title}
                        link={each.link}
                        self={each}
                        practitioner={findPract(each.practitioner_id)}
                        setCurrentSession={setCurrentSession}
                    />   
                })
                :
                <p>no sessions to display</p>
            }
            </div>
            <h2>Featured Practitioners</h2>


        </main>
        </>

    )
}

export default Library