import { useState } from 'react'
import DeleteUserModal from './DeleteUserModal.jsx'
import { Link } from 'react-router-dom'


function MyProfile({ user, setUser }) {
    const [edit, setEdit] = useState(false)
    const [clicked, setClicked] = useState(false)

    function handleEditClick() {
        setEdit(!edit)
    }


    function handleSubmit(e) {
        e.preventDefault()
        

        console.log("got through submit function")

        const updateduser = {
            name: e.target.name.value ? e.target.name.value : user.name ,
            email: e.target.email.value ? e.target.email.value : user.email,
            job: e.target.job.value ? e.target.job.value : user.job
        }

        console.log(updateduser)

        fetch(`/api/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateduser)
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            handleClick()
            user.name = data.name
            user.email = data.email
            user.job = data.job
            setUser(data)
        })
    }


    function handleClick() {
        setClicked(!clicked)
    }


    return(
        <>
        <div id="profilepage-container">
            <div id="profilepage-infoside">
                <div id="titleandbutton">
                    <h2>My Profile</h2>
                    <button id="ellipsesbtn" onClick={handleClick}>...</button>
                        {clicked ? 
                        <div className="dropdown-content">
                            <span onClick={() => {handleEditClick(), setClicked(!clicked)}}>Edit Profile</span>
                            <DeleteUserModal user={user} setUser={setUser} clicked={clicked} setClicked={setClicked}/>
                            <Link to="/mysparks">Go to My Sparks</Link>
                        </div>
                        :
                        null
                        }
                </div>
                {edit ? 
                <div>
                    <form className="editprofile-form" onSubmit={handleSubmit}>
                        <input name="name" placeholder={`${user.name}`}></input>
                        <br></br>
                        <input name="email" placeholder={`${user.email}`}></input>
                        <br></br>
                        <input name="job" placeholder={`${user.job ? user.job : "Job"}`}></input>
                        <br></br>                        
                        <button type="submit">Submit</button>
                        <button onClick={() => setEdit(!edit)}>Cancel</button>
                    </form>
                </div>
                :
                <div>
                    <p><strong>Name</strong> {user.name}</p>
                    <p><strong>Email</strong> {user.email}</p>
                    <p><strong>Job</strong> {user.job}</p>
                    <img id="profilepic" src={user.image_url ? user.image_url : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}/>
                </div>
                }
                
            </div>
            <img id="profilepage-image" src="https://assets.classicfm.com/2018/06/mirga-grazinyte-tyla-1518615696.jpg"/>    
        </div>
        </>
    )
}

export default MyProfile