import { useState } from 'react'

function SortButton({ name, sortCategories, setSortCategories, buttonChange }) {
    const [clicked, setClicked] = useState(false)

 
    

    function handleClick() {
        setClicked(!clicked)
        buttonChange(name)
    }        




    return (
        <>
        <button id="categorybtn" onClick={() => handleClick()}>{name}</button>
        </>
    )
}

export default SortButton