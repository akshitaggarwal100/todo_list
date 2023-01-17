import React, { useRef, useState } from 'react'
import './SignUp.css'
import { Link } from "react-router-dom";
import { useUserDataContext } from '../../AppContext';
import { db } from '../../FirebaseConfig';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { signup, signInWithGoogle } = useUserDataContext()

    const formData = useRef(null)

    async function handleSignup(e) {
        e.preventDefault()
        const name = formData.current.name.value
        const email = formData.current.email.value
        const password = formData.current.password.value
        try {
            setLoading(true)
            const user = await signup(email, password)
            await setDoc(doc(db, 'users', user.user.uid), { name: name, todos: ['Add your todos'] })
            navigate('/login')
        }
        catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    async function handleSignInWithGoogle(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const user = await signInWithGoogle()
            const temp = await getDoc(doc(db, 'users', user.user.uid))
            
            if (temp.data() === undefined) {
                await setDoc(doc(db, 'users', user.user.uid), { name: user.user.displayName, todos: ['Add your todos'] })
            }

            navigate('/todos')
        }
        catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    return (
        <div className='signup'>
            <div>
                <h1 className='signupHeading'>Sign Up</h1>
                {error && <div className='error'>
                    {error}
                </div>}
                <form className='signupForm' ref={formData} onSubmit={handleSignup}>
                    <div className='input'>
                        <label htmlFor='nameField'>Name</label>
                        <input name='name' type='text' id='nameField' />
                    </div>

                    <div className='input'>
                        <label htmlFor='emailField'>Email</label>
                        <input name='email' type='email' id='emailField' />
                    </div>

                    <div className='input'>
                        <label htmlFor='passwordField'>Password</label>
                        <input name='password' type='password' id='passwordField' />
                    </div>

                    <button disabled={loading} className='signupBtn'>Submit</button>

                    <button disabled={loading} className='signupBtn' type='button' onClick={handleSignInWithGoogle}>Signup with Google</button>

                    <Link to='/login' className='link'>
                        Already an user?
                    </Link>
                </form>
            </div>
        </div>
    )
}