import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DemoUserForm from '../auth/DemoUserForm';
import { useTimeContext } from '../../context/TimeContext';
import './SplashPage.css'

const SplashPage = () => {
    const { hour, minutes, seconds, currentTime } = useTimeContext()
    const currentUser = useSelector(state => state.session.user)

    if (currentUser) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div id='splash-page'>
            {/* ---------------------------- LOGO ---------------------------- */}
            <div className='splash-timeout-logo'>
                <img className='splash-page-icon' src={process.env.PUBLIC_URL + '../../../../static/timeout-black.png'}></img>
            </div>
            {/* ---------------------------- TIME ---------------------------- */}
            <div className='splash-full-time'>
                <div className='splash-time-ctn'>
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
                            {/* If hour is in between 12 and 23 inclusive, then show PM.
                            24 === 12 AM and anything less than 12 is before noon, so show AM */}
                            {currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) >= 12 && currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) <= 23 ? 'PM' : 'AM'}
                        </div>
                    </div>
                </div>
            </div>
            <div className='splash-days'>
                <div className='splash-sun' style={{color: currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).includes('Sun') ? '#3478F6' : 'rgba(0, 0, 0, 0.4)'}}>SUN</div>
                <div className='splash-mon' style={{color: currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).includes('Mon') ? '#3478F6' : 'rgba(0, 0, 0, 0.4)'}}>MON</div>
                <div className='splash-tue' style={{color: currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).includes('Tue') ? '#3478F6' : 'rgba(0, 0, 0, 0.4)'}}>TUE</div>
                <div className='splash-wed' style={{color: currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).includes('Wed') ? '#3478F6' : 'rgba(0, 0, 0, 0.4)'}}>WED</div>
                <div className='splash-thu' style={{color: currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).includes('Thu') ? '#3478F6' : 'rgba(0, 0, 0, 0.4)'}}>THU</div>
                <div className='splash-fri' style={{color: currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).includes('Fri') ? '#3478F6' : 'rgba(0, 0, 0, 0.4)'}}>FRI</div>
                <div className='splash-sat' style={{color: currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).includes('Sat') ? '#3478F6' : 'rgba(0, 0, 0, 0.4)'}}>SAT</div>
            </div>
            {/* ---------------------------- ENTRIES ---------------------------- */}
            <div className='splash-entries'>
                <div className='splash-login-ctn'>
                    <div className='login-label'>
                        Login
                    </div>
                    {/* ---------------------------- LOGIN SWITCH & BALL ---------------------------- */}
                    <Link to='/login'>
                        <div className='splash-switch'>
                            <div className='splash-ball'>
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
                        <div className='splash-switch'>
                            <div className='splash-ball'>
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
