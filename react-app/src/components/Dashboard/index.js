import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import CreateAlarmlistModal from "./CreateAlarmlistModal"
import './Dashboard.css'
import EditAlarmlistForm from "./EditAlarmlistForm"

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj).reverse()

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
    }, [dispatch])

    return (
        <div id='dashboard'>
            <div className='create-alarmlist-modal'>
                <CreateAlarmlistModal />
            </div>
            <div className='alarmlist-content'>
                {alarmlistsArr && alarmlistsArr.map(alarmlist => (
                    <div key={alarmlist.id} className={`alarmlist-${alarmlist.id}`}>
                        {edit
                        ? <EditAlarmlistForm edit={edit} setEdit={setEdit} alarmlist={alarmlist} />
                        :
                        <>
                            <div className='alarmlist-name'>
                                <Link to={`/${alarmlist.id}`}>
                                    {alarmlist.name === 'Default' ? 'Other' : alarmlist.name}
                                </Link>
                            </div>
                            <div className=''>
                                <button type='button' onClick={() => setEdit(!edit)}>
                                    <span className="fa-solid fa-pen"></span>
                                </button>
                            </div>
                        </>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
