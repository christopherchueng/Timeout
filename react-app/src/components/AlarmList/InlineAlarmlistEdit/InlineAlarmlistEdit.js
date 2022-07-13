import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import EditAlarmlistForm from "../EditAlarmlistForm"
import DeleteAlarmlistModal from "../DeleteAlarmlistModal"
import AlarmlistToggle from "../AlarmlistToggle/AlarmlistToggle"
import Alarm from "../../Alarm"
import './InlineAlarmlistEdit.css'

const InlineAlarmlistEdit = ({ alarmlist }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [alarmOn, setAlarmOn] = useState(false)
    const [alarmlistOn, setAlarmlistOn] = useState(false)

    return (
        <div className={`alarmlist-${alarmlist.id}`}>
            {isEditing
                ?
                    <div id={'edit-alarmlist-form'} className={`edit-alarmlist-${alarmlist.id}`}>
                        <EditAlarmlistForm isEditing={isEditing} setIsEditing={setIsEditing} alarmlist={alarmlist} />
                    </div>
                :
                    <>
                        <div className='alarmlist-name-and-settings'>
                            <div className='dashboard-alarmlist-name'>
                                <h1>
                                    <Link to={`/alarmlists/${alarmlist.id}`}>
                                        {alarmlist.name}
                                    </Link>
                                </h1>
                                {/* Default alarmlist name (alarmlistId 1) cannot be deleted or edited */}
                                {alarmlist.id !== 1
                                ?
                                <div className='alarmlist-btn-settings'>
                                    <div className='edit-alarmlist'>
                                        <button type='button' className={`alarmlist-edit-btn-${alarmlist.id}`} onClick={() => setIsEditing(!isEditing)}>
                                            <span className="fa-solid fa-pen"></span>
                                        </button>
                                    </div>
                                    <div className='delete-alarmlist'>
                                        <DeleteAlarmlistModal alarmlist={alarmlist} />
                                    </div>
                                </div>
                                : ""}
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default InlineAlarmlistEdit
