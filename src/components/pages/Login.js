import React from 'react'
import AppbarLogin from '../headers/AppbarLogin'
import AppFooter from '../Footer/AppFooter'
import Loginform from '../forms/Loginform'

function Login() {
    return (
        <>
             <AppbarLogin />
                <Loginform />
            <AppFooter />
        </>
    )
}

export default Login
