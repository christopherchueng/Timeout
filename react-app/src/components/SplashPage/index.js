import { Link } from 'react-router-dom';
import DemoUserForm from '../auth/DemoUserForm';
import './SplashPage.css'

const SplashPage = () => {
    return (
        <>
            <h1>Hi from Splash</h1>
            <Link to='/login' exact={true}>
                Login
            </Link>
            <Link to='/register' exact={true}>
                Register
            </Link>
            <DemoUserForm />
        </>
    )
}

export default SplashPage
