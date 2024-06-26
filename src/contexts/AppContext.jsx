import axios from "axios";
import { createContext, useEffect, useState } from "react"
import LoadingPages from "../components/LoadingPages";

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true)
                let token = localStorage.getItem('token')
                if (!token) {
                    return
                }

                const rs = await axios.get("http://192.168.42.139/api/me", {
                    headers: { Authorization: `Bearer ${token}`}
                })

                setUser(rs.data.data[0])
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        run();
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading, setLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };
export default AuthContext;