import { useDispatch, useSelector } from "react-redux"
import "./Form.css"
import { useEffect, useState } from "react"
import { addUser, getUsers } from "./formSlice"
import { Users } from "./Users"

export const Form = () => {

    const dispatch = useDispatch()
    const { arr, loading } = useSelector((state) => state.form)

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [values, setValues] = useState(false)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const handleAdd = () => {
        if (name.length == 0 || password.length == 0) {
            setValues(true)
        } else {
            const data = { name, password }
            dispatch(addUser(data))
        }
    }

    if (loading) return <h2>...Loading</h2>

    return (
        <div className="container">
            <div className="inputs">
                <div className="name">
                    <h2>Enter name:</h2>
                    <input type="text" name="name" onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="password">
                    <h2>Enter password:</h2>
                    <input type="text" name="password" onChange={e => setPassword(e.target.value)} ></input>
                </div>
                <button onClick={handleAdd}>Add</button>
                {values && <h2 className="warning">Enter all Credentials</h2>}
            </div>
            <Users />
        </div>
    )
}