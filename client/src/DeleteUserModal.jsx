import Dialog from "@mui/material/Dialog"
import { useState } from "react"



function DeleteUserModal({ user, setUser }) {

    const [openDialog, setOpenDialog] = useState(false)

    function handleClickOpen() {
        setOpenDialog(true)
    }

    function handleClickClose() {
        setOpenDialog(false)
    }

    function handleDelete() {

        fetch(`/api/users/${user.id}`, {
            method: "DELETE"
        })
        .then(r => setUser(null))

    }
    
    
    
    
    return(
        <>
        <span onClick={handleClickOpen}>Delete Account</span>
        <Dialog id="loginmodal" onClose={handleClickClose} open={openDialog}>
            <h2>Are you sure you'd like to delete your account? Look at all the fun you'll be missing...</h2>
            <div>
                <button onClick={handleDelete}>Yes, I'm sure</button>
                <button onClick={handleClickClose}>No, never mind</button>
            </div>
        </Dialog>
        </>
    )
}

export default DeleteUserModal