import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const TimeContext = createContext();

export const useTimeContext = () => useContext(TimeContext);

export default function TimeProvider({ children }) {
    const currentTime = new Date()
    const [hour, setHour] = useState((currentTime.getHours()))
    const [minutes, setMinutes] = useState(currentTime.getMinutes())
    const [seconds, setSeconds] = useState(currentTime.getSeconds())
    const [meridiem, setMeridiem] = useState(currentTime.getHours() >= 12 ? 'PM' : 'AM')
    // const [time, setTime] = useState('')

    useEffect(() => {
        const secInterval = setInterval(() => setSeconds(currentTime.toLocaleTimeString('en-US', {second: 'numeric'})), 1000)
        const minInterval = setInterval(() => setMinutes(currentTime.toLocaleTimeString('en-US', {hour12: true, minute: 'numeric'})), 1000)
        const hourInterval = setInterval(() => setHour(((currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}))) % 12 || 12, 1000))
        const meridInterval = setInterval(() => setMeridiem(hour >= 12 ? 'PM' : 'AM'), 1000)
        // const setCurrentTime = setInterval(() => setTime(currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'})), 1000)
        return () => {
            clearInterval(secInterval)
            clearInterval(minInterval)
            clearInterval(hourInterval)
            clearInterval(meridInterval)
            // clearInterval(setCurrentTime)
        }
    })
    return (
        <TimeContext.Provider value={{ hour, minutes, seconds, meridiem, currentTime }}>
            { children }
        </TimeContext.Provider>
    )
}
