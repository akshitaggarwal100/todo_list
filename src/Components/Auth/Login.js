import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { useUserDataContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const formData = useRef(null)
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const { login } = useUserDataContext()

    async function handleLogin(e) {
        e.preventDefault()
        const email = formData.current.email.value
        const password = formData.current.password.value

        try {
            await login(email, password)
            navigate('/todos')
        }
        catch (e) {
            setError(e.message)
        }

    }

    return (
        <div className='login'>
            <div className='loginBox'>
                <h1 className='loginHeading'>Login</h1>
                {error && <div className='error'>
                    {error}
                </div>}
                <form className='loginForm' ref={formData} onSubmit={handleLogin}>
                    <div className='input'>
                        <label htmlFor='emailField'>Email</label>
                        <input name='email' type='email' id='emailField' />
                    </div>

                    <div className='input'>
                        <label htmlFor='passwordField'>Password</label>
                        <input name='password' type='password' id='passwordField' />
                    </div>

                    <button className='signupBtn'>Login</button>

                    <Link className='link' to='/'>Need an Account?</Link>
                    <Link className='link' to="/resetPass">Forgotten your password?</Link>
                </form>
            </div>
        </div>
    )
}