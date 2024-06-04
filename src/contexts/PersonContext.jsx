import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const PersonContext = createContext()

function PersonContextProvider(props) {

    const [ person, setPerson ] = useState([]);

    useEffect(() => {
        const run = async () => {
            try {
                let token = localStorage.getItem('token')
                const rs = await axios.get('http://192.168.42.139/api/dashboard/person/2024-06-04', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setPerson(rs?.data?.responese.recordset)
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