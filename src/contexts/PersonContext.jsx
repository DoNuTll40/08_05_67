import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const PersonContext = createContext()

function PersonContextProvider(props) {

    const [ person, setPerson ] = useState([]);

    useEffect(() => {
        const run = async () => {
            try {
                const date = new Date().toISOString().split('T')[0];
                let token = localStorage.getItem('token')
                if(!token) return
                const rs = await axios.get(`http://192.168.42.139/api/dashboard/person/${date}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setPerson(rs?.data?.responese.recordsets[0])
            } catch (err) {
                console.log(err.responese?.data?.message)
            }
        }
        run()
    }, [])

    const value = { person }

    return (
        <PersonContext.Provider value={value}>
            {props.children}
        </PersonContext.Provider>
    )
}

export { PersonContextProvider }
export default PersonContext;