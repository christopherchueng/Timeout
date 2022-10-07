import { createContext, useContext, useState} from 'react';

export const SidebarContext = createContext();

export const useSidebarContext = () => useContext(SidebarContext);

export default function SidebarProvider({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <SidebarContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>
            { children }
        </SidebarContext.Provider>
    )
}
