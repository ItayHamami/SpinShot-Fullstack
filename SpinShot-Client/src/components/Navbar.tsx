import { FunctionComponent,  } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
    userInfo: any
    setUserInfo: Function;
}
//${isDark ? 'bg-dark navbar-dark' : 'bg-light navbar-light'} (in nav classname)
//line 87 <div className="mx-3">  <DarkModeToggle/></div>
const Navbar: FunctionComponent<NavbarProps> = ({userInfo ,setUserInfo}) => {


    let navigate = useNavigate();

    let handleLogout= ()=>{
    sessionStorage.removeItem("userInfo");
    setUserInfo({userEmail: false , isAdmin:false})
        navigate("/");
    }
    return (
        <>

<nav className={`navbar navbar-expand-lg navbar-light`}>
        <div className="container">
            <NavLink className="navbar-brand" to="/">
            <img src="../SpinShot.png" alt="" />
            </NavLink>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" >
                <NavLink
                className="nav-link"
            aria-current="page"
                to="/about"> About</NavLink>
            </li>
            <li className="nav-item" >
                <NavLink
                className="nav-link"
            aria-current="page"
                to="/products">Products</NavLink>
            </li>
            {(userInfo.userEmail) &&(
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/cart">
                        My Cart
                        </NavLink>
                    </li>
            )}
            {(userInfo.isAdmin) &&(
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/addproduct">
                        New Product
                        </NavLink>
                    </li>
            )}
           

            </ul>
            <form className="d-flex" role="search">

            {userInfo.userEmail ?  ( <><button className="btn btn-outline-primary" onClick={() =>{;
        handleLogout()}}>Logout</button>
        </>) :
        (<><button className="btn btn-outline-primary" onClick={() => navigate("/register")}>Register</button><button className="btn btn-outline-primary mx-1" onClick={() => navigate("/login")}>Login</button></>)
            
        }

            </form>
        </div>
        

        </div>
    </nav>


    </>
    );
}

export default Navbar;