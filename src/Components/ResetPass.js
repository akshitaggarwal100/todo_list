import React, { useRef, useState } from 'react'
import { useUserDataContext } from '../AppContext'
import './ResetPass.css'
import { Link } from 'react-router-dom'

export default function ForgotPass() {

    const formData = useRef(null)
    const [error, setError] = useState('')
    const [message, setMesage] = useState('')

    const { resetPassword } = useUserDataContext()

    async function handleLogin(e) {
        e.preventDefault()
        const email = formData.current.email.value

        try {
            await resetPassword(email)
            setMesage('Check your inbox for further instuctions')
        }
        catch (e) {
            setError(e.message)
        }

    }

    return (
        <div className='forgotPass'>
            <div className='forgotPassBox'>
                <h1 className='forgotPassHeading'>Reset Password</h1>
                {error && <div className='error'>
                    {error}
                </div> ||
                    message && <div className='message'>
                        {message}
                    </div>
                }
                <form className='forgotPassForm' ref={formData} onSubmit={handleLogin}>
                    <div className='input'>
                        <label htmlFor='emailField'>Email</label>
                        <input name='email' type='email' id='emailField' />
                    </div>

                    <button className='signupBtn'>Reset Password</button>

                    <Link className='link' to='/login'>Login</Link>
                </form>
            </div>
        </div>
    )
}
