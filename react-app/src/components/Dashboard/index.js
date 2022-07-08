import { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import CreateAlarmlistModal from "./CreateAlarmlistModal"
import EditAlarmlistForm from "./EditAlarmlistForm"
import DeleteAlarmlistModal from "./DeleteAlarmlistModal"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)
    const alarmlists = alarmlistsArr.reverse()
    const defaultAlarmlist = alarmlists.splice(-1, 1)[0]

    const [currAlarmlist, setCurrAlarmlist] = useState()
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
    }, [dispatch])

    useEffect(() => {
        const divClassName = inputRef.current
        setCurrAlarmlist(divClassName)
        // console.log('here is the alarmlist id', editingThis) // 11, 4, etc
    })

    const onClick = (alarmlist) => {
        setEdit(!edit)
        // console.log('here is the alarmlist id', alarmlist.id) // 11, 4, etc
    }

    return (
        <div id='dashboard'>
            <div className='create-alarmlist-modal'>
                <CreateAlarmlistModal />
            </div>
            <div className='alarmlist-content'>
                {alarmlists && alarmlists.map(alarmlist => (
                    <div key={alarmlist.id} className={`alarmlist-${alarmlist.id}`}>
                        {edit
                            ? <div className={`edit-alarmlist-${alarmlist.id}`} ref={inputRef}>
                                <EditAlarmlistForm edit={edit} setEdit={setEdit} alarmlist={alarmlist} />
                            </div>
                            :
                            <>
                                <div className='alarmlist-name'>
                                    <Link to={`/${alarmlist.id}`}>
                                        {alarmlist.name}
                                    </Link>
                                </div>
                                <div className={`edit-alarmlist-btn`}>
                                    <button type='button' onClick={() => onClick(alarmlist)}>
                                        <span className="fa-solid fa-pen"></span>
                                    </button>
                                    <DeleteAlarmlistModal alarmlist={alarmlist} />
                                </div>
                            </>
                        }
                    </div>
                ))}
                <div className='default-alarmlist'>
                    <Link to={`/${defaultAlarmlist?.id}`}>
                        {defaultAlarmlist?.name}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
