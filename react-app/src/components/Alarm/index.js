import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarms } from "../../store/alarm"
import './Alarm.css'

const Alarm = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAlarms())
    }, [dispatch])

    return (
        <div>

        </div>
    )
}

export default Alarm
