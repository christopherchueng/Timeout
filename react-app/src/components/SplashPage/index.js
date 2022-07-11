import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DemoUserForm from '../auth/DemoUserForm';
import './SplashPage.css'

const SplashPage = () => {
    const currentTime = new Date()
    const [hour, setHour] = useState((currentTime.getHours() + 24) % 12 || 12)
    const [minutes, setMinutes] = useState(currentTime.getMinutes())
    const [seconds, setSeconds] = useState(currentTime.getSeconds())
    const [meridiem, setMeridiem] = useState(currentTime.getHours() >= 12 ? 'PM' : 'AM')

    useEffect(() => {
        const secInterval = setInterval(() => setSeconds(currentTime.getSeconds()), 1000)
        const minInterval = setInterval(() => setMinutes(currentTime.getMinutes()), 1000)
        const hourInterval = setInterval(() => setHour((currentTime.getHours() + 24) % 12 || 12), 1000)
        const meridInterval = setInterval(() => setMeridiem(currentTime.getHours() >= 12 ? 'PM' : 'AM'), 1000)
        return () => {
            clearInterval(secInterval)
            clearInterval(minInterval)
            clearInterval(hourInterval)
            clearInterval(meridInterval)
        }
    })

    return (
        <div id='splash-page'>
            {/* ---------------------------- LOGO ---------------------------- */}
            <div className='splash-timeout-logo'>
                <img className='splash-page-icon' src={process.env.PUBLIC_URL + '../../../../static/timeout-black.png'}></img>
            </div>
            {/* ---------------------------- TIME ---------------------------- */}
            <div className='splash-full-time'>
                <div className='splash-time-ctn'>
                    {/* {time} */}
                    <div className='splash-hour'>
                        {hour}
                    </div>
                    <div className='splash-second-colon'>
                        {seconds % 2 === 0 ? ":" : ""}
                    </div>
                    <div className='splash-minutes'>
                        {minutes < 10 ? '0' + minutes : minutes}
                    </div>
                    <div className='meridiem-ctn'>
                        <div className='splash-meridiem'>
                            {meridiem}
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------------------------- ENTRIES ---------------------------- */}
            <div className='splash-entries'>
                <div className='splash-login-ctn'>
                    <div className='login-label'>
                        Login
                    </div>
                    {/* ---------------------------- LOGIN SWITCH & BALL ---------------------------- */}
                    <Link to='/login'>
                        <div className='switch'>
                            <div className='ball'>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='splash-register-ctn'>
                    <div className='register-label'>
                        Register
                    </div>
                    {/* ---------------------------- REGISTER SWITCH & BALL ---------------------------- */}
                    <Link to='/register'>
                        <div className='switch'>
                            <div className='ball'>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='splash-demo-ctn'>
                    <div className='splash-demo'>
                        Demo
                    </div>
                    {/* ---------------------------- DEMO SWITCH & BALL ---------------------------- */}
                    <DemoUserForm />
                </div>
            </div>
        </div>
    )
}

export default SplashPage
