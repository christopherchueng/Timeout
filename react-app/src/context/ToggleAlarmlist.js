import { createContext, useContext, useState } from 'react';

export const ToggleAlarmlistContext = createContext();

export const useToggleAlarmlist = () => useContext(ToggleAlarmlistContext);

export default function ToggleAlarmlistProvider({ children }) {
    const [alarmlistOn, setAlarmlistOn] = useState(false)

    return (
        <ToggleAlarmlistContext.Provider value={{ alarmlistOn, setAlarmlistOn }}>
            { children }
        </ToggleAlarmlistContext.Provider>
    )
}
