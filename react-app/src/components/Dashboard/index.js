import React, { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import CreateAlarmlistModal from "./CreateAlarmlistModal"
import EditAlarmlistForm from "./EditAlarmlistForm"
import DeleteAlarmlistModal from "./DeleteAlarmlistModal"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)
    const alarmlists = alarmlistsArr.reverse()
    const defaultAlarmlist = alarmlists.splice(-1, 1)[0]

    const [currAlarmlist, setCurrAlarmlist] = useState()
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
    }, [dispatch])

    useEffect(() => {


        const testing = inputRef.current
        setCurrAlarmlist(testing)
        // Prints: <input name="edit_2" type="text" placeholder="Name" value="Work">
        console.log('whatis this alarmlist', testing)
    })

    const onClick = (e, alarmlist) => {
        let currentDiv = e.currentTarget.className // prints: alarmlist-edit-btn-11
        let currentDivArr = currentDiv.split('-')
        let divId = currentDivArr[currentDivArr.length - 1] // 11

        let inputDiv = document.getElementsByClassName(`edit-alarmlist-${alarmlist.id}`)
        // Prints: HTMLCollection [] // Why us this empty, but shows length 1?! (see below)
            // 0: div#alarmlist-form-11.edit-alarmlist-11
            // alarmlist-form-11: div#alarmlist-form-11.edit-alarmlist-11
            // length: 1


        if (parseInt(divId) === alarmlist.id) {
            setIsEditing(!isEditing)
        }

        // const testing = inputRef.current?.focus()

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
                        {!isEditing
                            ?
                            <>
                                <div className='alarmlist-name'>
                                    <Link to={`/${alarmlist.id}`}>
                                        {alarmlist.name}
                                    </Link>
                                </div>
                                <div className={`edit-alarmlist-btn`}>
                                    <button type='button' className={`alarmlist-edit-btn-${alarmlist.id}`} onClick={(e) => onClick(e, alarmlist)}>
                                        <span className="fa-solid fa-pen"></span>
                                    </button>
                                    <DeleteAlarmlistModal alarmlist={alarmlist} />
                                </div>
                            </>
                            :
                            <div id={`alarmlist-form-${alarmlist.id}`} className={`edit-alarmlist-${alarmlist.id}`}>
                                <EditAlarmlistForm ref={inputRef} isEditing={isEditing} setIsEditing={setIsEditing} alarmlist={alarmlist} />
                            </div>

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
