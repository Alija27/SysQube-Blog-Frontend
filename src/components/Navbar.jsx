import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
export const Navbar = () => {
    const { user } = useAuth();
    return (
        <>
            <nav className="bg-white font-semibold text-gray-800  text-md flex justify-between  shadow-lg p-4">
                <div>
                    <h1 className="font-serif">SysQube</h1>
                </div>
                <div>
                    <ul className="flex space-x-5">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            {user ? <Link to="/dashboard/posts">Dashboard</Link> : null}
                        </li>
                        <li>
                            {user ? <Link to="/logout">Logout</Link> :
                                <Link to="/login">Login</Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar;
