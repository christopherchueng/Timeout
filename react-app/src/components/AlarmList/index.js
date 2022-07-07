import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"

const AlarmList = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)

    useEffect(() => {
        dispatch(getAlarmlists())
    }, [dispatch])

    return (
        <div id='alarmlists'>
            <div className='alarmlist-content'>
                {alarmlistsArr && alarmlistsArr.map(alarmlist => (
                    <div key={alarmlist.id}>
                        {alarmlist.name === 'Default' ? 'Other' : alarmlist.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AlarmList
