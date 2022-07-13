import { createContext, useContext, useState } from 'react';

export const ToggleContext = createContext();

export const useToggleContext = () => useContext(ToggleContext);

export default function ToggleProvider({ children }) {
    const [alarmlistOn, setAlarmlistOn] = useState(false)
    const [alarmOn, setAlarmOn] = useState(false)

    return (
        <ToggleContext.Provider value={{ alarmlistOn, setAlarmlistOn, alarmOn, setAlarmOn }}>
            { children }
        </ToggleContext.Provider>
    )
}
