import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import FullLoader from "../components/FullLoader";

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        await axiosInstance
            .get("/user")
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch(() => {
                setUser(null);
            });
            setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading && <FullLoader />}
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
}

