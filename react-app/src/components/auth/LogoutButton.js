import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../../store/session'
import { clearAlarmlists } from '../../store/alarmlist'
import { clearAlarms } from '../../store/alarm'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout())
    await dispatch(clearAlarms())
    await dispatch(clearAlarmlists())
    history.push('/')
  }

  return (
    <button className='logout-switch' onClick={onLogout}>
      <span className='logout-span'>Logout</span>
      <div className='logout-ball'></div>
    </button>
    )
}

export default LogoutButton
