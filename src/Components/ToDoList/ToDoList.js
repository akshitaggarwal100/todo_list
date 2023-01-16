import './ToDoList.css'
import { BiMenu } from 'react-icons/bi'
import Todos from './Todos/Todos'
import { useUserDataContext } from '../../AppContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export default function ToDoList() {
  const { logout, currentUser } = useUserDataContext()
  const [menu, setMenu] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [user, setUser] = useState({name: ''})
    
  useEffect(() => {
    return async () => {
      const response = await getDoc(doc(db, 'users', currentUser.uid))
      setUser(response.data())
    }
  }, [])

  function handleMenu() {
    setMenu(!menu)
  }

  async function handleSignout() {
    try {
      await logout()
      navigate('/login')
    }
    catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className='home'>
      <nav className='navbar'>
        <span className='logo'>To Do List</span>
        <BiMenu onClick={handleMenu} className='menuBtn' />
      </nav>
      <button onClick={handleSignout} className={menu ? 'logout' : 'disable'}>Logout</button>
      {error && <div className='logoutError'>
        {error}
      </div>}

      <main className='todos'>
        <h1 className='userHeading'>Welcome<br className='headingBreaker'/> {user.name}</h1>
        <h2 className='taskHeading'>Your Tasks</h2>
        <Todos />
      </main>
    </div>
  )
}