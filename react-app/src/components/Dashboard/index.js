import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AlarmList from "../AlarmList"
import './Dashboard.css'

const Dashboard = () => {
    return (
        <>
            <h1>Hi from Dashboard!!!</h1>
            <AlarmList />
        </>
    )
}

export default Dashboard
