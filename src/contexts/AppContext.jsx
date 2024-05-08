import axios from "axios";
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const run = async () => {
            try {
                let token = localStorage.getItem('token')
                if (!token) {
                    return
                }

                const rs = await axios.get("http://192.168.45.21:1506/api/me", {
                    headers: { Authorization: `Bearer ${token}`}
                })

                setUser(rs.data.data[0])
            } catch (err) {
                console.log(err)
            }
        }

        run();
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };
export default AuthContext;