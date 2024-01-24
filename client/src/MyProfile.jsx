import { useState } from 'react'


function MyProfile({ user, setUser }) {
    const [edit, setEdit] = useState(false)

    function handleClick() {
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
        })


    }

    //all this above is almost totally working except the welcome message on top in the header component does not receive the new user name





    return(
        <>
        <h2>My Profile</h2>
        <div id="profilepage-container">
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
                </form>
            </div>
            :
            <div>
                <p><strong>Name</strong> {user.name}</p>
                <p><strong>Email</strong> {user.email}</p>
                <p><strong>Job</strong> {user.job}</p>
            </div>
            }
            <div className="dropdown">
                <button id="ellipsesbtn">&#8230;</button>
                <div className="dropdown-content">
                    <span onClick={() => handleClick()}>Edit Profile</span>
                    <span>Delete Profile</span>
                    <span>Go to My Sparks</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default MyProfile