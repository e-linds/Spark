import React from 'react'
import { useState } from "react"
import Dialog from "@mui/material/Dialog"


function SignupModal({ user, setUser}) {
    const [openDialog, setOpenDialog] = useState(false)

    function handleClickOpen() {
        setOpenDialog(true)
    }

    function handleClickClose() {
        setOpenDialog(false)
    }


    function handleSubmit(e) {
        e.preventDefault()

        const newuser = {
            name: e.target.name.value,
            email: e.target.email.value,
            job: e.target.job.value,
            password: e.target.password.value,
            image_url: e.target.image_url.value
        }

        if (newuser.name && newuser.email) {
           
            fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newuser)
            })
            .then(r => r.json())
            .then(data => setUser(data)
            
            )
        }
    }


    return (
<div>
    <button class="openingpagebutton" onClick={handleClickOpen}>Create Account</button>
    <Dialog id="loginmodal" onClose={handleClickClose} open={openDialog}>
            <form className="opening-form" type="submit"  onSubmit={handleSubmit}>
                <input name="name" placeholder="Name"></input>
                <br></br>
                <input name="email" placeholder="Email"></input>
                <br></br>
                <input name="job" placeholder="Job"></input>
                <br></br>
                <input name="password" placeholder="Password"></input>
                <br></br>
                <input name="image_url" placeholder="Profile Picture Link"></input>
                <br></br>
                <button type="submit" onClick={handleClickClose}>Create Account</button>
            </form>
    </Dialog>
</div>

        )

}


export default SignupModal