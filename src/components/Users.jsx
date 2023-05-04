import { useDispatch, useSelector } from "react-redux"
import "./Form.css"
import { deleteUser, editUser } from "./formSlice"
import { useEffect, useState } from "react"

export const Users = () => {

    const { arr } = useSelector(state => state.form)
    const dispatch = useDispatch()

    const [edit, setEdit] = useState([])
    const [editedValue, setEditedValue] = useState("")

    const deleteUserSingle = (id) => {
        dispatch(deleteUser(id))
    }

    const edituser = (id) => {
        if (edit.includes(id)) {
            if (editedValue.length === 0) {
                return
            }
            const arr = edit.filter(e => e !== id)
            setEdit(arr)
            const data = {
                id: id,
                name: editedValue
            }
            dispatch(editUser(data))
        } else {
            setEdit([...edit, id])
        }
    }

    return (
        <div className="names" >
            {arr.map((e) => (
                <div key={e._id} className="namesdetails namesdetails_main">
                    <div className="namesdetails ">
                        <p>{e.name}</p>
                        <p>{e.password}</p>
                        {edit.includes(e._id) && <input type="text"
                            placeholder="Enter new name"
                            onChange={ele => setEditedValue(ele.target.value)}></input>}
                    </div>
                    <div className="namesdetails-buttons ">
                        {edit.includes(e._id) ?
                            <button onClick={() => edituser(e._id)} className="save">Save</button> :
                            <button onClick={() => edituser(e._id)} className="edit">Edit</button>
                        }
                        <button onClick={() => deleteUserSingle(e._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}