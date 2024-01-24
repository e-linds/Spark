import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import SessionBlock from "./SessionBlock"
import SortButton from './SortButton.jsx'



function Library({ sessions, practitioners, setCurrentSession, findPract, categories }) {
    const [sortCategories, setSortCategories] = useState({})

    function create_dict(input) {
        let all_categ = {}
        input.map((each) => {
            all_categ[each.name] = false
        })
        setSortCategories(all_categ)
        return all_categ
    }


    useEffect(() => {
        create_dict(categories)
    }, [])

    // let sessioncategories = []

    // useEffect(() => {
        // fetch session categories - I'm not sure whether there's a better way to do this? 
    //     fetch('/api/sessioncategories')
    //     .then(r => r.json())
    //     .then(data => sessioncategories = [data])
    // })


    function buttonChange(input) {

        let new_dict = sortCategories

        if (sortCategories[input] === true) {

            new_dict[input] = false
            setSortCategories(new_dict)
            
        } else if (sortCategories[input] === false) {

            new_dict[input] = true
            setSortCategories(new_dict)

        }}

        
// in the middle of figuring out how to get a list of categories for each session - might need to call sessioncategory join table?
        // function sortSessions() {
        //     console.log(sessioncategories)

        //     sessioncategories.map((each) => {
        //         console.log(each.session_id)
        //     })
            // let filtered_sessions = []
            // console.log(sessions.filter((each) => {
            //     const session_categ = each.category
            //     console.log(session_categ)
            //     if (sortCategories[session_categ] === true) {
            //         return true
            //     } 
            // }))
            // console.log(newarray)
        // }
        console.log(sortCategories)
        // sortSessions()


    
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
                {sessions ? sessions.map((each) => {
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
                <p>no sessions to load</p>
            }
            </div>
            <h2>Featured Practitioners</h2>


        </main>
        </>

    )
}

export default Library