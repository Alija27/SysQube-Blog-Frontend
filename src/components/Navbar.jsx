import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
export const Navbar = () => {
    const { user } = useAuth();
    console.log(user);
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
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar;
