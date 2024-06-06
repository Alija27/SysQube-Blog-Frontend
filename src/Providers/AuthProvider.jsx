import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";


const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        await axiosInstance
            .get("/user")
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch(() => {
                setUser(null);
            });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
}

