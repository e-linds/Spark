import { Link } from "react-router-dom"



function Header({ user, setUser, setCurrentTab }) {

    function handleClick() {

        fetch("/api/logout", {
          method: "DELETE"
      })
      .then(r => setUser(null)
      ) }

//letting this go for now ---- would like to have the nav bar change blue when we are on that tab
    // function handleNav() {

    //   const current = document.querySelector(id === "mysparks")
    //   console.log(current)


    // }




    return(
    <header id="fullheader">
      <img src='./sparklogo.png' title="Spark Mindful Artistry" id="headerlogo"/>
      {/* <h1>Welcome, {user.name}!</h1>  */}
      <div id="header-details">
          <Link className="headerlinks" id="library" to="/library">Library</Link>
          <Link className="headerlinks" id="mysparks" to="/mysparks">My Sparks</Link>
          <Link className="headerlinks" id="myprofile" to="/users/">My Profile</Link>
          <button id="logoutbtn" onClick={handleClick} href="/library">Logout</button>
      </div>
    </header>
    )
}

export default Header