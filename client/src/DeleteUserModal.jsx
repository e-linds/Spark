import Dialog from "@mui/material/Dialog"
import { useState } from "react"



function DeleteUserModal({ user, setUser, clicked, setClicked }) {

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
        <Dialog id="deleteaccountmodal" onClose={handleClickClose} open={openDialog}>
            <div>
                <h2>Are you sure you'd like to delete your account?</h2>
                <button onClick={handleDelete}>Yes, I'm sure</button>
                <button onClick={() => {handleClickClose, setClicked(!clicked)}}>Oops, never mind</button>
            </div>
        </Dialog>
        </>
    )
}

export default DeleteUserModal