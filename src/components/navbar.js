import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const navigate = useNavigate();

    const [cookies,setCookies] = useCookies(["access_token"]);

    const logOut = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("username");
        navigate("/auth");
    };

    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            {!cookies.access_token ? (
                <Link to="/auth">Log In/Register</Link>
            ):(
                <>
                    <Link to="/create-recipe">Create Recipe</Link>
                    <Link to="/saved-recipes">Saved Recipes</Link>
                    <button onClick={logOut}>Log Out</button>
                </>
            )}
        </div>
    )
}