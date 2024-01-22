import React, { useState } from "react"
import Dialog from "@mui/material/Dialog"


function LoginModal({ stay, setStay, user, setUser }) {
    const [openDialog, setOpenDialog] = useState(false)

    function handleClickOpen() {
        setOpenDialog(true)
    }

    function handleClickClose() {
        setOpenDialog(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const userinfo = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        if (userinfo.email && userinfo.password) {
           
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userinfo.email,
                    password: userinfo.password,
                    stay: stay
                })
            })
            .then(r => {
                if (r.ok) {
                    return r.json()
                } else {
                    return null
                }
            })
            
            .then(data => setUser(data))
        }


    }

    return (
<div>
    <button class="openingpagebutton" onClick={handleClickOpen}>Login</button>
    <Dialog id="loginmodal" onClose={handleClickClose} open={openDialog}>
            <form type="submit" class="login" onSubmit={handleSubmit}>
                <input name="email" placeholder="Email"></input>
                <br></br>
                <input name="password" placeholder="Password"></input>
                <br></br>
                <button type="submit" onClick={handleClickClose}>Login</button>
            </form>
    </Dialog>
</div>

        )

}


export default LoginModal