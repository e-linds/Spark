import React from 'react'
import LoginModal from "./LoginModal.jsx"
import SignupModal from "./SignupModal.jsx"

function Opening({ stay, setStay, user, setUser}) {
    return(
        <main class="grid" id="opening_page_container">
            <div class = "container">
                <img src='./sparklogo.png' title="Spark Mindful Artistry"/>
            </div>
            <div class="container">
                <p>Welcome to Spark Mindful Artistry, a hub for musicians' wellness.</p> 
                <p>Our goal is to help you develop healthy practice and performance habits.</p>
                <p>We're so glad you're here!</p>
                <div class="grid">
                        <LoginModal stay={stay} setStay={setStay} user={user} setUser={setUser}/>
                        <SignupModal user={user} setUser={setUser}/>
                </div>
            </div>
        </main>
    )



}


export default Opening