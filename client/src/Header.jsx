import { Link } from "react-router-dom"



function Header({ user, setUser }) {

    function handleClick() {

        fetch("/api/logout", {
          method: "DELETE"
      })
      .then(r => setUser(null)
      )

    
    }




    return(
    <header class="grid">
      <h1>Welcome, {user.name}</h1> 
      <div id="header-details">
          <Link to="/library">Library</Link>
          <Link to="/mysparks">My Sparks</Link>
          <Link to="/users/">My Profile</Link>
          <button id="logoutbtn" onClick={handleClick}>Logout</button>
      </div>
    </header>
    )
}

export default Header