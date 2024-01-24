import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import SessionBlock from "./SessionBlock"
import SessionPage from './SessionPage.jsx'
import SortButton from './SortButton.jsx'



function Library({ sessions, setSessions, practitioners, setPractitioners, setCurrentSession, findPract, categories, setCategories }) {
    const [sortCategories, setSortCategories] = useState({})


    useEffect(() => {

        function create_dict(input) {
            let all_categ = {}
            input.map((each) => {
                all_categ[each.name] = false
            })
            setSortCategories(all_categ)
            return all_categ
        }
        create_dict(categories)

    }, [])


    function buttonChange(input) {

        let new_dict = sortCategories

        if (sortCategories[input] === true) {

            new_dict[input] = false
            setSortCategories(new_dict)
            
        } else if (sortCategories[input] === false) {

            new_dict[input] = true
            setSortCategories(new_dict)

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