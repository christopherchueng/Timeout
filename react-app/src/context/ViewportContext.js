import { createContext, useContext, useEffect, useState } from 'react'

export const ViewportContext = createContext()

export const useViewPortContext = () => useContext(ViewportContext)

export default function ViewportProvider({ children }) {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const handleWindowResize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize)
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    return (
        <ViewportContext.Provider value={{ width, height }}>
            {children}
        </ViewportContext.Provider>
    )
}
