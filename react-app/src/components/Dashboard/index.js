import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import CreateAlarmlistModal from "./CreateAlarmlistModal"
import EditAlarmlistForm from "./EditAlarmlistForm"
import DeleteAlarmlistModal from "./DeleteAlarmlistModal"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    let alarmlistsArr = Object.values(alarmlistsObj).reverse()

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
    }, [dispatch])

    const editOnClick = e => {
        setEdit(!edit)
        alarmlistsArr.forEach(alarmlist => {
            let editFormId = document.getElementsByClassName(`edit-alarmlist-${alarmlist.id}`)
            console.log('what is this edit form list', editFormId)
        })

    }

    return (
        <div id='dashboard'>
            <div className='create-alarmlist-modal'>
                <CreateAlarmlistModal />
            </div>
            <div className='alarmlist-content'>
                {alarmlistsArr && alarmlistsArr.map(alarmlist => (
                    <div key={alarmlist.id} className={`alarmlist-${alarmlist.id}`}>
                        {edit
                            ? <div className={`edit-alarmlist-${alarmlist.id}`}>
                                <EditAlarmlistForm edit={edit} setEdit={setEdit} alarmlist={alarmlist} />
                            </div>
                            :
                            <>
                                <div className='alarmlist-name'>
                                    <Link to={`/${alarmlist.id}`}>
                                        {alarmlist.name === 'Default' ? 'Other' : alarmlist.name}
                                    </Link>
                                </div>
                                <div className={`edit-alarmlist-btn`}>
                                    <button type='button' onClick={editOnClick}>
                                        <span className="fa-solid fa-pen"></span>
                                    </button>
                                    <DeleteAlarmlistModal alarmlist={alarmlist} />
                                </div>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
