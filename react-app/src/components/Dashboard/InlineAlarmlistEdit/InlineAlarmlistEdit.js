import { useState } from "react"
import { Link } from "react-router-dom"
import EditAlarmlistForm from "../EditAlarmlistForm"
import DeleteAlarmlistModal from "../DeleteAlarmlistModal"

const InlineAlarmlistEdit = ({ alarmlist }) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
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
                        <button type='button' className={`alarmlist-edit-btn-${alarmlist.id}`} onClick={() => setIsEditing(!isEditing)}>
                            <span className="fa-solid fa-pen"></span>
                        </button>
                        <DeleteAlarmlistModal alarmlist={alarmlist} />
                    </div>
                </>
                :
                <div id={`alarmlist-form-${alarmlist.id}`} className={`edit-alarmlist-${alarmlist.id}`}>
                    <EditAlarmlistForm isEditing={isEditing} setIsEditing={setIsEditing} alarmlist={alarmlist} />
                </div>
            }
        </div>
    )
}

export default InlineAlarmlistEdit
